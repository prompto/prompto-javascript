import BaseExpression from '../../../main/prompto/expression/BaseExpression.ts'

export default class ParenthesisExpression extends BaseExpression {
  
    constructor(expression) {
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

    check(context: Context): Type {
        return this.expression.check(context);
    }

    interpret(context: Context): Value {
        return this.expression.interpret(context);
    }

    checkQuery(context) {
        if (!this.expression["checkQuery"]) {
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
            return;
        }
        this.expression.checkQuery(context);
    }

    interpretQuery(context, query) {
        if (!this.expression["interpretQuery"])
            context.problemListener.reportIllegalOperation(this, "Not a predicate: " + this.expression.toString());
        this.expression.interpretQuery(context, query);
        query.not();
    }

    transpileQuery(transpiler, builderName) {
        this.expression.transpileQuery(transpiler, builderName);
    }
}
