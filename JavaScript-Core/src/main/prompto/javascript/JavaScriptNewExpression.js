var JavaScriptExpression = require("./JavaScriptExpression").JavaScriptExpression;

class JavaScriptNewExpression extends JavaScriptExpression {

    constructor(method) {
        super();
        this.method = method;
    }

    toString() {
        return "new " + this.method.toString();
    }

    interpret(context, module) {
        return this.method.interpretNew(context, module);
    }

    transpile(transpiler) {
        transpiler.append('new ');
        this.method.transpile(transpiler);
    }

    toDialect(writer) {
        writer.append('new ');
        this.method.toDialect(writer);
    }
}

exports.JavaScriptNewExpression = JavaScriptNewExpression;