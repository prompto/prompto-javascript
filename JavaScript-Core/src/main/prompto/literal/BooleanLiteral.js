const Literal = require("./Literal").Literal;
const BooleanType = require("../type/BooleanType").BooleanType;
const BooleanValue = require("../value/BooleanValue").BooleanValue;

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