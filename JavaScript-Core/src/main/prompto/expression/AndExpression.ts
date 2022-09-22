import BaseExpression from './BaseExpression'
import { Dialect } from '../parser'
import {BooleanValue, Value} from '../value'
import { CodeWriter } from '../utils'
import {Expression} from "./index";
import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import Predicate from "./Predicate";
import {TestMethodDeclaration} from "../declaration";
import {QueryBuilder} from "../store";

export default class AndExpression extends BaseExpression implements Predicate {

    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    toString(): string {
        return this.left.toString() + " and " + this.right.toString();
    }

    operatorToDialect(dialect: Dialect): string {
        return dialect==Dialect.O ? " && " : " and ";
    }

    toEDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" and ");
        this.right.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" && ");
        this.right.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(" and ");
        this.right.toDialect(writer);
    }

    check(context: Context): Type {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkAnd(context, this, rt);
    }

    checkQuery(context: Context): void {
        if(this.left.isPredicate())
            (this.left as unknown as Predicate).checkQuery(context);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as unknown as Predicate).checkQuery(context);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
    }

    interpret(context: Context): Value {
        const lval = this.left.interpret(context);
        if(lval instanceof BooleanValue) {
            if (!lval.value)
                return lval;
            const rval = this.right.interpret(context);
            return lval.And(context, rval);
        } else {
            context.problemListener.reportIllegalOperation(this, "Expected a Boolean, got " + lval.type.name);
            return BooleanValue.FALSE;
        }
    }

    declare(transpiler: Transpiler): void {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.left.transpile(transpiler);
        transpiler.append(" && ");
        this.right.transpile(transpiler);
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const lval = this.left.interpret(context);
        let rval = lval;
        if(lval instanceof BooleanValue && lval.value)
            rval = this.right.interpret(context);
        if(rval==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect);
        const actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    getExpected(context: Context, dialect: Dialect, escapeMode = 0): string {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    interpretQuery(context: Context, query: QueryBuilder): void {
        if(this.left.isPredicate())
            (this.left as unknown as Predicate).interpretQuery(context, query);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as unknown as Predicate).interpretQuery(context, query);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        query.and();
    }

    declareQuery(transpiler: Transpiler): void {
        if(this.left.isPredicate())
            (this.left as unknown as Predicate).declareQuery(transpiler);
        else
            transpiler.context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as unknown as Predicate).declareQuery(transpiler);
        else
            transpiler.context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
    }

    transpileQuery(transpiler: Transpiler, builderName: string): void {
        if(this.left.isPredicate())
            (this.left as unknown as Predicate).transpileQuery(transpiler, builderName);
        else
            transpiler.context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as unknown as Predicate).transpileQuery(transpiler, builderName);
        else
            transpiler.context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        transpiler.append(builderName).append(".and();").newLine();
    }

}
