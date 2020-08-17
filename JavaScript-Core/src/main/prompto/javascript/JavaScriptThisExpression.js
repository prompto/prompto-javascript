
export default class JavaScriptThisExpression extends JavaScriptExpression {

    constructor() {
        super();
        this.expression = new ThisExpression();
    }

    interpret(context) {
        return this.expression.interpret(context);
    }

    toDialect(writer) {
        return writer.append("this");
    }

    transpile(transpiler) {
        transpiler.append("this");
    }

    toString() {
        return "this";
    }
}
