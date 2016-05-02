var BaseType = require("./BaseType").BaseType;
var Identifier = require("../grammar/Identifier").Identifier;

function NullType() {
    BaseType.call(this, new Identifier("Null"));
    return this;
}

NullType.prototype = Object.create(BaseType.prototype);
NullType.prototype.constructor = NullType;

NullType.instance = new NullType();

NullType.prototype.checkUnique = function(self, context) {
    // ok
};

NullType.prototype.checkExists = function(self, context) {
    // ok
};

NullType.prototype.isAssignableTo = function(self, context, other) {
    return true;
};

NullType.prototype.isMoreSpecificThan = function(self, context, other) {
    return false;
};


NullType.prototype.equals = function(self, other) {
    return other==this;
};

exports.NullType = NullType;
