const NativeType = require("./NativeType").NativeType;
const Identifier = require("../grammar/Identifier").Identifier;

class MissingType extends NativeType {
    constructor() {
        super(new Identifier("*"));
        return this;
    }

    isAssignableFrom(context, other) {
        return true;
    }
}

MissingType.instance = new MissingType();

exports.MissingType = MissingType;