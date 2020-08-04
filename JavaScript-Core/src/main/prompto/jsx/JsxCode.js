var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var JsxType = require("../type/JsxType").JsxType;

class JsxCode extends IJsxExpression {
    constructor(expression, suite) {
        super();
        this.expression = expression;
        this.suite = suite;
        return this;
    }

    check(context) {
        this.expression.check(context);
        return JsxType.instance;
    }

    toDialect(writer) {
        writer.append("{");
        this.expression.toDialect(writer);
        writer.append("}");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        this.expression.transpile(transpiler);
    }
}

exports.JsxCode = JsxCode;
