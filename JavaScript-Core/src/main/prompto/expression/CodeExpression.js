
export default class CodeExpression extends Expression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "Code: " + this.expression.toString();
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("Code: ");
        this.expression.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("Code(");
        this.expression.toDialect(writer);
        writer.append(")");
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    check(context) {
        return CodeType.instance;
    }

    interpret(context) {
        return new CodeValue(this);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        // nothing to do
    }

    // expression can only be checked and evaluated in the context of an execute:
    checkCode(context) {
        return this.expression.check(context);
    }

    interpretCode(context) {
        return this.expression.interpret(context);
    }

    declareCode(transpiler) {
        this.expression.declare(transpiler);
    }

    transpileCode(transpiler) {
        this.expression.transpile(transpiler);
    }
}

