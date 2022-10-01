import BaseExpression from './BaseExpression'
import { Dialect } from '../parser'
import {BooleanValue, IValue} from '../value'
import { CodeWriter } from '../utils'
import {IAssertion, IExpression, IPredicate} from "./index";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {TestMethodDeclaration} from "../declaration";
import {IQueryBuilder} from "../store";

export default class OrExpression extends BaseExpression implements IPredicate, IAssertion {

    left: IExpression;
    right: IExpression;

    constructor(left: IExpression, right: IExpression) {
        super();
        this.left = left;
        this.right = right;
    }

    toString() {
        return this.left.toString() + " or " + this.right.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    operatorToDialect(dialect: Dialect) {
        return dialect==Dialect.O ? " || " : " or ";
    }

    toEDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.left.toDialect(writer);
        writer.append(this.operatorToDialect(writer.dialect));
        this.right.toDialect(writer);
    }

    check(context: Context): IType {
        const lt = this.left.check(context);
        const rt = this.right.check(context);
        return lt.checkOr(context, this, rt);
    }

    checkQuery(context: Context) {
        if(this.left.isPredicate())
            (this.left as IPredicate).checkQuery(context);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as IPredicate).checkQuery(context);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
    }

    declare(transpiler: Transpiler): void {
        this.left.declare(transpiler);
        this.right.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.left.transpile(transpiler);
        transpiler.append(" || ");
        this.right.transpile(transpiler);
    }

    interpret(context: Context): IValue {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        return lval.Or(context, rval);
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const lval = this.left.interpret(context);
        const rval = this.right.interpret(context);
        const result = lval.Or(context, rval);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect, 0);
        const actual = lval.toString() + this.operatorToDialect(test.dialect) + rval.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number) {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect) {
        transpiler.append("(");
        this.left.transpile(transpiler);
        transpiler.append(") + '").append(this.operatorToDialect(dialect)).append("' + (");
        this.right.transpile(transpiler);
        transpiler.append(")");
    }

    interpretQuery(context: Context, query: IQueryBuilder) {
        if(this.left.isPredicate())
            (this.left as IPredicate).interpretQuery(context, query);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.left.toString());
        if(this.right.isPredicate())
            (this.right as IPredicate).interpretQuery(context, query);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.right.toString());
        query.or();
    }

    declareQuery(transpiler: Transpiler) {
        if(this.left.isPredicate())
            (this.left as IPredicate).declareQuery(transpiler);
        if(this.right.isPredicate())
            (this.right as IPredicate).declareQuery(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        if(this.left.isPredicate())
            (this.left as IPredicate).transpileQuery(transpiler, builderName);
        if(this.right.isPredicate())
            (this.right as IPredicate).transpileQuery(transpiler, builderName);
        transpiler.append(builderName).append(".or();").newLine();
    }

    checkAssert(context: Context): Context {
        return context;
    }
}
