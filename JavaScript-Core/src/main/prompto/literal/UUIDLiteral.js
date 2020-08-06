const Literal = require("./Literal").Literal;
const UUIDValue = require("../value/UUIDValue").UUIDValue;
const UUIDType = require("../type/UUIDType").UUIDType;

/*jshint evil:true*/
function parse(text) {
	return eval(text);
}

class UUIDLiteral extends Literal {
    constructor(text) {
        super(text, new UUIDValue(parse(text)));
        return this;
    }

    check(context) {
        return UUIDType.instance;
    }

    declare(transpiler) {
        const UUID = require("../intrinsic/UUID").UUID;
        transpiler.require(UUID);
    }

    transpile(transpiler) {
        transpiler.append("UUID.fromString(").append(this.text).append(")");
    }
}


exports.UUIDLiteral = UUIDLiteral;
