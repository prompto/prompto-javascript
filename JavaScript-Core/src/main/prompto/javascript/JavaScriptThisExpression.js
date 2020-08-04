var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;
var ThisExpression = require("../expression/ThisExpression").ThisExpression;

class JavaScriptThisExpression extends JavaScriptExpression {
    constructor() {
        super();
        this.expression = new ThisExpression();
        return this;
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

exports.JavaScriptThisExpression = JavaScriptThisExpression;