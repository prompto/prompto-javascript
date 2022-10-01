import BaseExpression from './BaseExpression'
import { Dialect } from '../parser'
import {BooleanType, IType} from '../type'
import {BooleanValue, IValue} from '../value'
import { CodeWriter } from '../utils'
import {IAssertion, IExpression, IPredicate} from "./index";
import {Context, Transpiler} from "../runtime";
import {TestMethodDeclaration} from "../declaration";
import {IQueryBuilder} from "../store";

export default class NotExpression extends BaseExpression implements IPredicate, IAssertion {

    expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "not " + this.expression.toString();
    }

    operatorToDialect(dialect: Dialect) {
        return dialect==Dialect.O ? "! ": "not ";
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
        this.expression.toDialect(writer);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("not ");
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("not ");
    }

    toODialect(writer: CodeWriter): void {
        writer.append("!");
    }

    check(context: Context): IType {
        const type = this.expression.check(context);
        if (type)
            return type.checkNot(context, this);
        else {
            context.problemListener.reportError(this, "Could not check expression to negate");
            return BooleanType.instance; // don't propagate error
        }
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("!(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    }

    interpret(context: Context): IValue {
        const val = this.expression.interpret(context);
        return val.Not(context);
    }

    interpretAssert(context: Context, test: TestMethodDeclaration): boolean {
        const result = this.interpret(context);
        if(result==BooleanValue.TRUE)
            return true;
        const expected = this.getExpected(context, test.dialect, 0);
        const actual = this.operatorToDialect(test.dialect) + result.toString();
        test.printFailedAssertion(context, expected, actual);
        return false;
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

    declareQuery(transpiler: Transpiler) {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).declareQuery(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        if(this.expression.isPredicate())
            (this.expression as IPredicate).transpileQuery(transpiler, builderName);
        transpiler.append(builderName).append(".not();").newLine();
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number) {
        const writer = new CodeWriter(dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect) {
        this.transpile(transpiler);
    }

    checkAssert(context: Context): Context {
        return context;
    }
}

