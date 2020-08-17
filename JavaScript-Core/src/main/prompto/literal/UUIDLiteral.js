
/*jshint evil:true*/
function parse(text) {
	return eval(text);
}

export default class UUIDLiteral extends Literal {

    constructor(text) {
        super(text, new UUIDValue(parse(text)));
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


