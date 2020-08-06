const Value = require("./Value").Value;
const CodeType = require("../type/CodeType").CodeType;

class CodeValue extends Value {
    constructor(expression) {
        super(CodeType.instance);
        this.expression = expression;
        return this;
    }

    check(context) {
        return this.expression.checkCode (context);
    }

    interpret(context) {
        return this.expression.interpretCode (context);
    }

    declareCode(transpiler) {
        this.expression.declareCode (transpiler);
    }

    transpileCode(transpiler) {
        this.expression.transpileCode (transpiler);
    }
}


exports.CodeValue = CodeValue; 