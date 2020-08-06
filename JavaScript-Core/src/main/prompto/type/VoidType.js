const NativeType = require("./NativeType").NativeType;
const Identifier = require("../grammar/Identifier").Identifier;

class VoidType extends NativeType {
    constructor() {
        super(new Identifier("Void"));
        return this;
    }

    isAssignableFrom(context, other) {
        // illegal, but happens during syntax checking, if error is collected rather than thrown
        return false;
    }
}

VoidType.instance = new VoidType();


exports.VoidType = VoidType;
