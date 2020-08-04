var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

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