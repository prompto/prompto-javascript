import BaseExpression from './BaseExpression'
import {Assertion, Expression, InstanceExpression, Predicate, TypeExpression, UnresolvedIdentifier} from './index'
import {EqOp, Identifier} from '../grammar'
import {MatchOp, QueryBuilder} from '../store'
import {Variable, LinkedVariable, LinkedValue, Context, Transpiler} from '../runtime'
import {
    ContainerType,
    TextType,
    CharacterType,
    BooleanType,
    NullType,
    IntegerType,
    DecimalType,
    MethodType,
    CategoryType, Type, VoidType
} from '../type'
import {NullValue, BooleanValue, Value, TypeValue, Instance, Container, TextValue} from '../value'
import { CodeWriter, removeAccents, isAMethod, isInstanceOf } from '../utils'
import { SyntaxError } from '../error'
import BaseValue from "../value/BaseValue";
import {TestMethodDeclaration} from "../declaration";
import {Dialect} from "../parser";

const VOWELS = "AEIO"; // sufficient here

export default class EqualsExpression extends BaseExpression implements Predicate, Assertion {

    left: Expression;
    operator: EqOp;
    right: Expression;

    constructor(left: Expression, operator: EqOp, right: Expression) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    toString(): string {
        return this.left.toString() + " " + this.operator.toString(this.dialect) + " " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" ");
        this.operator.toDialect(writer);
        // make this a AN
        if(this.operator === EqOp.IS_A || this.operator ===  EqOp.IS_NOT_A) {
            const name = this.right.toString();
            if(VOWELS.indexOf(name.charAt(0))>=0)
                writer.append("n");
        }
        writer.append(" ");
        this.right.toDialect(writer);
    }

    check(context: Context): Type {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return this.checkOperator(context, lt, rt);
    }

    checkOperator(context: Context, lt: Type, rt: Type): Type {
        if(this.operator === EqOp.CONTAINS || this.operator === EqOp.NOT_CONTAINS) {
            if(lt instanceof ContainerType)
                lt = lt.itemType;
            if(rt instanceof ContainerType)
                rt = rt.itemType;
            if(lt !== TextType.instance || !(rt === TextType.instance || rt === CharacterType.instance))
                throw new SyntaxError("'contains' only operates on textual value!");
        }
        return BooleanType.instance; // can compare all objects
    }

    interpret(context: Context): Value {
        const lval = this.left.interpret(context) || NullValue.instance;
        const rval = this.right.interpret(context) || NullValue.instance;
        return this.interpretValues(context, lval, rval);
    }

    interpretValues(context: Context, lval: Value, rval: Value): Value {
        let equal = false;
        switch(this.operator) {
            case EqOp.IS:
                equal = lval == rval;
                break;
            case EqOp.IS_NOT:
                equal = lval != rval;
                break;
            case EqOp.IS_A:
                equal = this.isA(context,lval,rval);
                break;
            case EqOp.IS_NOT_A:
                equal = !this.isA(context,lval,rval);
                break;
            case EqOp.EQUALS:
                equal = this.areEqual(context,lval,rval);
                break;
            case EqOp.NOT_EQUALS:
                equal = !this.areEqual(context,lval,rval);
                break;
            case EqOp.ROUGHLY:
                equal = this.roughly(context,lval,rval);
                break;
            case EqOp.CONTAINS:
                equal = this.contains(context,lval,rval);
                break;
            case EqOp.NOT_CONTAINS:
                equal = !this.contains(context,lval,rval);
                break;
        }
        return BooleanValue.ValueOf(equal);
    }

    contains(context: Context, lval: Value, rval: Value): boolean {
        if(lval instanceof Container) {
            return lval.Contains(context, rval);
        } else {
            return false;
        }
    }

    roughly(context: Context, lval: Value, rval: Value): boolean {
        if(lval instanceof TextValue) {
            return lval.Roughly(context, rval);
        } else {
            return this.areEqual(context, lval, rval);
        }
    }

    areEqual(context: Context, lval: Value, rval: Value): boolean {
        if(lval === rval) {
            return true;
        } else if(lval === NullValue.instance || rval === NullValue.instance) {
            return false;
        } else {
            return lval.equals(rval);
        }
    }

    isA(context: Context, lval: Value, rval: Value): boolean {
        if(lval instanceof BaseValue && rval instanceof TypeValue) {
            const actual = lval.type;
            if(actual == NullType.instance)
                return false;
            const toCheck = rval.value.resolve(context);
            return toCheck.isAssignableFrom(context, actual);
        } else
            return false;
    }

    downcast(context: Context, setValue: boolean): Context {
        if(this.operator === EqOp.IS_A) {
            const id = this.readLeftId();
            if(id) {
                let targetType = (this.right as TypeExpression).value.resolve(context);
                let value = context.getRegisteredInstance(id);
                if(!value && !setValue) // need a thing to avoid NPE
                    value = new Variable(id, targetType);
                const sourceType = value!.getType(context);
                if(sourceType.mutable)
                    targetType = targetType.asMutable(context, true);
                const local = context.newChildContext();
                value = new LinkedVariable(targetType, value);
                local.registerInstance(value!, false);
                if(setValue)
                    local.setValue(id, new LinkedValue(context));
                context = local;
            }
        }
        return context;
    }

    readLeftId(): Identifier | null {
        if(this.left instanceof InstanceExpression)
            return this.left.id;
        else if(this.left instanceof UnresolvedIdentifier)
            return this.left.id;
        else
            return null;
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const lval = this.left.interpret(context) || NullValue.instance;
        const rval = this.right.interpret(context) || NullValue.instance;
        const result = this.interpretValues(context, lval, rval);
        if(result === BooleanValue.TRUE)
            return true;
        const expected = (this as unknown as Assertion).getExpected(context, test.dialect, 0);
        const actual = lval.toString() + " " + this.operator.toString(test.dialect) + " " + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    checkQuery(context: Context): Type {
        const decl = this.left.checkAttribute(context);
        if(decl && decl.storable) {
            const rt = this.right.check(context);
            return this.checkOperator(context, decl.getType(), rt);
        } else {
            context.problemListener.reportNotStorable(this, decl ? decl.name : this.right.toString());
            return VoidType.instance;
        }
    }

    interpretQuery(context: Context, query: QueryBuilder): void {
        const decl = this.left.checkAttribute(context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to interpret predicate");
        let value = this.right.interpret(context);
        if (value instanceof Instance)
            value = value.getMemberValue(context, Identifier.DB_ID, false);
        const info = decl.getAttributeInfo();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = value.getStorableData();
        const match = this.getMatchOp();
        query.verify(info, match, data);
        if (this.operator.name.startsWith("NOT_"))
            query.not();
    }

    getMatchOp(): MatchOp {
        switch (this.operator) {
            case EqOp.IS:
            case EqOp.IS_NOT:
            case EqOp.EQUALS:
            case EqOp.NOT_EQUALS:
                return MatchOp.EQUALS;
            case EqOp.ROUGHLY:
                return MatchOp.ROUGHLY;
            case EqOp.CONTAINS:
            case EqOp.NOT_CONTAINS:
                return MatchOp.CONTAINS
            default:
                throw new Error("Not supported:" + this.operator.toString(this.dialect));
        }
    }

    declare(transpiler: Transpiler): void {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
        if (this.operator === EqOp.ROUGHLY) {
            transpiler.require(removeAccents);
        } else if (this.operator === EqOp.IS_A || this.operator === EqOp.IS_NOT_A) {
            transpiler.require(isAMethod);
            transpiler.require(isInstanceOf);
        }
    }

    transpile(transpiler: Transpiler): void {
        switch (this.operator) {
            case EqOp.EQUALS:
                this.transpileEquals(transpiler);
                break;
            case EqOp.NOT_EQUALS:
                this.transpileNotEquals(transpiler);
                break;
            case EqOp.ROUGHLY:
                this.transpileRoughly(transpiler);
                break;
            case EqOp.CONTAINS:
                this.transpileContains(transpiler);
                break;
            case EqOp.NOT_CONTAINS:
                this.transpileNotContains(transpiler);
                break;
            case EqOp.IS:
                this.transpileIs(transpiler);
                break;
            case EqOp.IS_NOT:
                this.transpileIsNot(transpiler);
                break;
            case EqOp.IS_A:
                this.transpileIsA(transpiler);
                break;
            case EqOp.IS_NOT_A:
                this.transpileIsNotA(transpiler);
                break;
            default:
                throw new Error("Cannot transpile:" + this.operator.toString(this.dialect));
        }
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + ' ").append(this.operator.toString(dialect)).append(" ' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number): string {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileRoughly(transpiler: Transpiler): void {
        transpiler.append("removeAccents(");
        this.left.transpile(transpiler);
        transpiler.append(").toLowerCase() === removeAccents(");
        this.right.transpile(transpiler);
        transpiler.append(").toLowerCase()");
    }

    transpileIs(transpiler: Transpiler): void {
        this.left.transpile(transpiler);
        transpiler.append(" === ");
        this.right.transpile(transpiler);
    }

    transpileIsNot(transpiler: Transpiler): void {
        this.left.transpile(transpiler);
        transpiler.append(" !== ");
        this.right.transpile(transpiler);
    }

    transpileEquals(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        if(lt === BooleanType.instance || lt === IntegerType.instance || lt === DecimalType.instance || lt === CharacterType.instance || lt === TextType.instance) {
            this.left.transpile(transpiler);
            transpiler.append(" === ");
            this.right.transpile(transpiler);
        } else {
            transpiler.append("equalObjects(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        }
    }

    transpileNotEquals(transpiler: Transpiler): void {
        const lt = this.left.check(transpiler.context);
        if(lt === BooleanType.instance || lt === IntegerType.instance || lt === DecimalType.instance || lt === CharacterType.instance || lt === TextType.instance) {
            this.left.transpile(transpiler);
            transpiler.append(" !== ");
            this.right.transpile(transpiler);
        } else {
            transpiler.append("!equalObjects(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        }
    }

    transpileContains(transpiler: Transpiler): void {
        this.left.transpile(transpiler);
        transpiler.append(".contains(");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    transpileNotContains(transpiler: Transpiler): void {
        transpiler.append("!");
        this.transpileContains(transpiler);
    }

    transpileIsNotA(transpiler: Transpiler): void {
        transpiler.append("!(");
        this.transpileIsA(transpiler);
        transpiler.append(")");
    }

    transpileIsA(transpiler: Transpiler): void {
        const right = (this.right as TypeExpression).value.resolve(transpiler.context);
        if(right===BooleanType.instance) {
            transpiler.append("isABoolean(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===IntegerType.instance) {
            transpiler.append("isAnInteger(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===DecimalType.instance) {
            transpiler.append("isADecimal(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===TextType.instance) {
            transpiler.append("isAText(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right===CharacterType.instance) {
            transpiler.append("isACharacter(");
            this.left.transpile(transpiler);
            transpiler.append(")");
        } else if(right instanceof MethodType) {
            transpiler.append("isAMethod(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            right.transpileMethodType(transpiler);
            transpiler.append(")");
        } else if(right instanceof CategoryType) {
            transpiler.append("isInstanceOf(");
            this.left.transpile(transpiler);
            transpiler.append(", ");
            this.right.transpile(transpiler);
            transpiler.append(")");
        } else {
            this.left.transpile(transpiler);
            transpiler.append(" instanceof ");
            this.right.transpile(transpiler);
        }
    }

    declareQuery(transpiler: Transpiler): void {
        transpiler.require(MatchOp);
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string): void {
        const decl = this.left.checkAttribute(transpiler.context);
        if(!decl || !decl.storable)
            throw new SyntaxError("Unable to transpile predicate");
        const info = decl.getAttributeInfo();
        const matchOp = this.getMatchOp();
        // TODO check for dbId field of instance value
        transpiler.append(builderName).append(".verify(").append(info.toTranspiled()).append(", MatchOp.").append(matchOp.name).append(", ");
        this.right.transpile(transpiler);
        transpiler.append(");").newLine();
        if (this.operator === EqOp.NOT_EQUALS || this.operator === EqOp.IS_NOT || this.operator === EqOp.NOT_CONTAINS)
            transpiler.append(builderName).append(".not();").newLine();
    }

    checkAssert(context: Context): Context {
        this.check(context);
        context = this.downcast(context, false);
        return context;
    }
}
