var Literal = require("./Literal").Literal;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

class BooleanLiteral extends Literal {
    constructor(text) {
        super(text, BooleanValue.Parse(text));
        return this;
    }

    check(context) {
        return BooleanType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}


exports.BooleanLiteral = BooleanLiteral;