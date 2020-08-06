const IntegerValue = require("../value/IntegerValue").IntegerValue;
const Literal = require("./Literal").Literal;
const IntegerType = require("../type/IntegerType").IntegerType;

function parse(value) {
	return parseInt(value);
}

class IntegerLiteral extends Literal {
    constructor(text, value) {
        super(text, new IntegerValue(value || parse(text)));
        return this;
    }

    check(context) {
        return IntegerType.instance;
    }

    declare(transpiler) {
        // nothing to do;
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}

class MinIntegerLiteral extends IntegerLiteral {
    constructor() {
        super("MIN_INTEGER", -0x20000000000000);
        return this;
    }

    transpile(transpiler) {
        transpiler.append("-0x20000000000000");
    }
}

class MaxIntegerLiteral extends IntegerLiteral {
    constructor() {
        super("MAX_INTEGER", 0x20000000000000);
        return this;
    }

    transpile(transpiler) {
        transpiler.append("0x20000000000000");
    }
}

exports.IntegerLiteral = IntegerLiteral;
exports.MinIntegerLiteral = MinIntegerLiteral;
exports.MaxIntegerLiteral = MaxIntegerLiteral;