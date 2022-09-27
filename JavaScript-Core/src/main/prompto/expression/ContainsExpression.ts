import BaseExpression from './BaseExpression'
import {SyntaxError} from '../error'
import {ContOp, Identifier} from '../grammar'
import {MatchOp, IQueryBuilder} from '../store'
import {UnresolvedIdentifier, InstanceExpression, MemberSelector, PredicateExpression} from '../expression'
import {IValue, NullValue, BooleanValue, Instance, Container} from '../value'
import {IterableType, IType, VoidType} from '../type'
import {CodeWriter} from '../utils'
import IExpression from "./IExpression";
import {Context, Transpiler} from "../runtime";
import {TestMethodDeclaration} from "../declaration";
import {Dialect} from "../parser";
import IAssertion from "./IAssertion";
import IPredicate from "./IPredicate";

export default class ContainsExpression extends BaseExpression implements IPredicate, IAssertion{

    left: IExpression;
    operator: ContOp;
    right: IExpression;

    constructor(left: IExpression, operator: ContOp, right: IExpression) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    toString(): string {
        return this.left.toString() + " " + this.operator.toString() + " " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" ");
        this.operator.toDialect(writer);
        writer.append(" ");
        if (this.right instanceof PredicateExpression)
            this.right.containsToDialect(writer);
        else
            this.right.toDialect(writer);
    }

    check(context: Context): IType {
        if (this.right instanceof PredicateExpression)
            return this.checkPredicate(context);
        else
            return this.checkValue(context);
    }


    checkPredicate(context: Context): IType {
        const lt = this.left.check(context);
        if (lt instanceof IterableType) {
            const itemType = lt.itemType;
            const arrow = (this.right as unknown as PredicateExpression).toArrowExpression();
            return arrow.checkFilter(context, itemType);
        } else
            throw new SyntaxError("Expecting collection");
    }


    checkValue(context: Context): IType {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context: Context, lt: IType, rt: IType): IType {
        switch (this.operator) {
            case ContOp.IN:
            case ContOp.NOT_IN:
                return rt.checkContains(context, this, lt);
            case ContOp.HAS:
            case ContOp.NOT_HAS:
                return lt.checkContains(context, this, rt);
            default:
                return lt.checkHasAllOrAny(context, this, rt);
        }
    }

    interpret(context: Context): IValue {
        if (this.right instanceof PredicateExpression)
            return this.interpretPredicate(context);
        else {
            const lval = this.left.interpret(context);
            const rval = this.right.interpret(context);
            return this.interpretValues(context, lval, rval);
        }
    }


    interpretPredicate(context: Context): IValue {
        const lval = this.left.interpret(context);
        if (lval instanceof Container)  {
            const itemType = lval.itemType;
            const arrow = (this.right as unknown as PredicateExpression).toArrowExpression();
            const predicate = arrow.getFilter(context, itemType);
            return this.interpretContainerPredicate(context, lval as unknown as Container<never>, predicate);
        } else
            throw new SyntaxError("Expecting a collection!");
    }


    interpretContainerPredicate(context: Context, container: Container<never>, predicate: (o: IValue) => boolean): IValue {
        let result: boolean | null = null;
        switch (this.operator) {
            case ContOp.HAS_ALL:
            case ContOp.NOT_HAS_ALL:
                result = this.allMatch(context, container, predicate);
                break;
            case ContOp.HAS_ANY:
            case ContOp.NOT_HAS_ANY:
                result = this.anyMatch(context, container, predicate);
                break;
        }
        if (typeof (result) == "boolean") {
            if (this.operator.name.startsWith("NOT_"))
                result = !result;
            return BooleanValue.ValueOf(result);
        }
        const lowerName = this.operator.name.toLowerCase().replace(/_/g, ' ');
        throw new SyntaxError("Illegal filter: " + typeof (container) + " " + lowerName)
    }


    allMatch(context: Context, container: Container<never>, predicate: (o: IValue) => boolean): boolean {
        return container.items.every(predicate);
    }


    anyMatch(context: Context, container: Container<never>, predicate: (o: IValue) => boolean): boolean {
        return container.items.some(predicate);
    }


    interpretValues(context: Context, lval: IValue, rval: IValue): IValue {
        let result: boolean | null = null;
        switch (this.operator) {
            case ContOp.IN:
            case ContOp.NOT_IN:
                if (rval == NullValue.instance)
                    result = false;
                else if (rval instanceof Container)
                    result = rval.hasValue(context, lval);
                break;
            case ContOp.HAS:
            case ContOp.NOT_HAS:
                if (lval == NullValue.instance)
                    result = false;
                else if (lval instanceof Container)
                    result = lval.hasValue(context, rval);
                break;
            case ContOp.HAS_ALL:
            case ContOp.NOT_HAS_ALL:
                if (lval == NullValue.instance || rval == NullValue.instance)
                    result = false;
                else if (lval instanceof Container && rval instanceof Container)
                    result = this.containsAll(context, lval as unknown as Container<never>, rval as unknown as Container<never>);
                break;
            case ContOp.HAS_ANY:
            case ContOp.NOT_HAS_ANY:
                if (lval == NullValue.instance || rval == NullValue.instance)
                    result = false;
                else if (lval instanceof Container && rval instanceof Container)
                    result = this.containsAny(context, lval as unknown as Container<never>, rval as unknown as Container<never>);
                break;
        }
        if (result != null) {
            if (this.operator.name.indexOf("NOT_") == 0) {
                result = !result;
            }
            return BooleanValue.ValueOf(result);
        }
        // error management
        if (this.operator.name.lastIndexOf("IN") == this.operator.name.length - "IN".length) {
            const tmp = lval;
            lval = rval;
            rval = tmp;
        }
        const lowerName = this.operator.name.toLowerCase().replace('_', ' ');
        throw new SyntaxError("Illegal comparison: " + lval.type.toString() + " " + lowerName + " " + rval.type.toString());
    }

    containsAll(context: Context, container: Container<never>, items: Container<never>): boolean {
        const iterItems = items.getIterator(context);
        while (iterItems.hasNext()) {
            const item = iterItems.next();
            if (!container.hasValue(context, item)) {
                return false;
            }
        }
        return true;
    }

    containsAny(context: Context, container: Container<never>, items: Container<never>): boolean {
        const iterItems = items.getIterator(context);
        while (iterItems.hasNext()) {
            const item = iterItems.next();
            if (container.hasValue(context, item)) {
                return true;
            }
        }
        return false;
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = this.interpretValues(context, lval, rval);
        if (result == BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect, 0);
        const actual = lval.toString() + " " + this.operator.toString() + " " + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        transpiler.append("('");
        this.left.transpile(transpiler);
        transpiler.append("') + '").append(this.operator.toString()).append("' + ('");
        this.right.transpile(transpiler);
        transpiler.append("')");
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number): string {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    checkQuery(context: Context): IType {
        const decl = this.left.checkAttribute(context);
        if (decl) {
            if (decl.storable) {
                const rt = this.right.check(context);
                return this.checkOperator(context, decl.getType(), rt);
            } else {
                context.problemListener.reportNotStorable(this, decl.name);
            }
        }
        return VoidType.instance;
    }

    interpretQuery(context: Context, query: IQueryBuilder): void {
        const decl = this.left.checkAttribute(context);
        if (!decl || !decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        const info = decl.getAttributeInfo();
        let value = this.right.interpret(context);
        if (value instanceof Instance)
            value = value.getMemberValue(context, Identifier.DB_ID, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = value.getStorableData();
        const matchOp = this.getMatchOp(context, decl.getType(), value.type, this.operator, false);
        query.verify(info, matchOp, data);
        if (this.operator.name.indexOf("NOT_") == 0)
            query.not();
    }

    declareQuery(transpiler: Transpiler): void {
        // TBD
    }

    transpileQuery(transpiler: Transpiler, builderName: string): void {
        const decl = this.left.checkAttribute(transpiler.context);
        if (!decl || !decl.storable)
            throw new SyntaxError("Unable to transpile predicate");
        const info = decl.getAttributeInfo();
        const type = this.right.check(transpiler.context);
        // TODO check for dbId field of instance value
        const matchOp = this.getMatchOp(transpiler.context, decl.getType(), type, this.operator, false);
        transpiler.append(builderName).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator.name.indexOf("NOT_") == 0)
            transpiler.append(builderName).append(".not();").newLine();
    }

    getAttributeType(context: Context, id: Identifier): IType | null {
        const named = context.getRegistered(id);
        return named ? named.getType(context) : null;
    }

    getMatchOp(context: Context, fieldType: IType, valueType: IType, operator: ContOp, reverse: boolean): MatchOp {
        if (reverse) {
            const reversed = operator.reverse();
            if (!reversed)
                throw new SyntaxError("Cannot reverse " + this.operator.toString());
            else
                return this.getMatchOp(context, valueType, fieldType, reversed, false);
        }
        if (operator == ContOp.HAS || operator == ContOp.NOT_HAS)
            return MatchOp.HAS;
        else if (operator == ContOp.IN || operator == ContOp.NOT_IN)
            return MatchOp.IN;
        else
            throw new SyntaxError("Unsupported operator: " + operator.toString());
    }

    readFieldName(exp: IExpression): string | null {
        if (exp instanceof UnresolvedIdentifier || exp instanceof InstanceExpression || exp instanceof MemberSelector)
            return exp.toString();
        else
            return null;
    }

    declare(transpiler: Transpiler): void {
        if (this.right instanceof PredicateExpression)
            this.declarePredicate(transpiler);
        else
            this.declareValue(transpiler);
    }


    declarePredicate(transpiler: Transpiler): void {
        this.left.declare(transpiler);
        const manyType = this.left.check(transpiler.context);
        const itemType = (manyType as unknown as IterableType).itemType;
        const arrow = (this.right as unknown as PredicateExpression).toArrowExpression();
        arrow.declareFilter(transpiler, itemType);
    }


    declareValue(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        switch (this.operator) {
            case ContOp.IN:
            case ContOp.NOT_IN:
                return rt.declareContains(transpiler, lt, this.right, this.left);
            case ContOp.HAS:
            case ContOp.NOT_HAS:
                return lt.declareContains(transpiler, rt, this.left, this.right);
            default:
                return lt.declareHasAllOrAny(transpiler, rt, this.left, this.right);
        }
    }

    transpile(transpiler: Transpiler): void {
        if (this.right instanceof PredicateExpression)
            this.transpilePredicate(transpiler);
        else
            this.transpileValue(transpiler);
    }

    transpilePredicate(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        switch (this.operator) {
            case ContOp.NOT_HAS_ALL:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ALL:
                lt.transpileHasAllPredicate(transpiler, this.left, this.right);
                break;
            case ContOp.NOT_HAS_ANY:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ANY:
                lt.transpileHasAnyPredicate(transpiler, this.left, this.right);
                break;
            default:
                throw new Error("Unsupported " + this.operator.name);
        }
    }


    transpileValue(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        const rt = this.right.check(transpiler.context);
        switch (this.operator) {
            case ContOp.NOT_IN:
                transpiler.append("!");
                // no-break
            case ContOp.IN:
                return rt.transpileContains(transpiler, lt, this.right, this.left);
            case ContOp.NOT_HAS:
                transpiler.append("!");
                // no-break
            case ContOp.HAS:
                return lt.transpileContains(transpiler, rt, this.left, this.right);
            case ContOp.NOT_HAS_ALL:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ALL:
                return lt.transpileHasAllValue(transpiler, rt, this.left, this.right);
            case ContOp.NOT_HAS_ANY:
                transpiler.append("!");
                // no-break
            case ContOp.HAS_ANY:
                return lt.transpileHasAnyValue(transpiler, rt, this.left, this.right);
            default:
                throw new Error("Unsupported " + this.operator.name);
        }
    }

    checkAssert(context: Context): Context {
        return context;
    }
}
