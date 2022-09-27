import BaseExpression from './BaseExpression'
import {IAssertion, IExpression, IPredicate} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IValue} from "../value";
import {IQueryBuilder} from "../store";
import {Dialect} from "../parser";
import {TestMethodDeclaration} from "../declaration";

export default class ParenthesisExpression extends BaseExpression implements IPredicate, IAssertion {

    expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "(" + this.expression.toString() + ")";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("(");
        this.expression.toDialect(writer);
        writer.append(")");
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    }

    check(context: Context): IType {
        return this.expression.check(context);
    }

    interpret(context: Context): IValue {
        return this.expression.interpret(context);
    }

    checkQuery(context: Context) {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).checkQuery(context);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
    }

    interpretQuery(context: Context, query: IQueryBuilder) {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).interpretQuery(context, query);
        else
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        query.not();
    }

    declareQuery(transpiler: Transpiler): void {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).declareQuery(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).transpileQuery(transpiler, builderName);
    }

    checkAssert(context: Context): Context {
        return context;
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number): string {
        if(this.expression.isAssertion())
            return (this.expression as IAssertion).getExpected(context, dialect, escapeMode);
        else
            return "";
    }

    interpretAssert(context: Context, method: TestMethodDeclaration): boolean {
        if(this.expression.isAssertion())
            return (this.expression as IAssertion).interpretAssert(context, method);
        else
            return false;
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        transpiler.append("(");
        if(this.expression.isAssertion())
            (this.expression as IAssertion).transpileFound(transpiler, dialect);
        transpiler.append(")");
    }
}
