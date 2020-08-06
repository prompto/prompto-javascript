const NativeType = require("./NativeType").NativeType;
const Identifier = require("../grammar/Identifier").Identifier;

class CssType extends NativeType {

    constructor() {
        super(new Identifier("Css"));
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("Object");
    }
}

CssType.instance = new CssType();

exports.CssType = CssType;