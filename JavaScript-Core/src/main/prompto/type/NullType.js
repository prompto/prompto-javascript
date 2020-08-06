const BaseType = require("./BaseType").BaseType;
const Identifier = require("../grammar/Identifier").Identifier;

class NullType extends BaseType {
    constructor() {
        super(new Identifier("Null"));
        return this;
    }

    checkUnique(context) {
        // ok
    }

    checkExists(context) {
        // ok
    }

    isAssignableFrom(context, other) {
        return true;
    }

    isMoreSpecificThan(context, other) {
        return false;
    }

    equals(other) {
        return other==this;
    }
}

NullType.instance = new NullType();

exports.NullType = NullType;
