const Literal = require("./Literal").Literal;
const DecimalValue = require("../value/DecimalValue").DecimalValue;
const DecimalType = require("../type/DecimalType").DecimalType;

class DecimalLiteral extends Literal {
    constructor(text) {
        super(text, DecimalValue.Parse(text));
        return this;
    }

    check(context) {
        return DecimalType.instance;
    }

    declare(transpiler) {
        // nothing to do;
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}


exports.DecimalLiteral = DecimalLiteral;