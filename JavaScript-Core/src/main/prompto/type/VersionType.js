var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;

function VersionType()  {
	NativeType.call(this, new Identifier("Version"));
	return this;
}

VersionType.prototype = Object.create(NativeType.prototype);
VersionType.prototype.constructor = VersionType;

VersionType.instance = new VersionType();


VersionType.prototype.checkCompare = function(context, other) {
	if (other instanceof VersionType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other);
	}
};

VersionType.prototype.declareCompare = function(context, other) {
    // nothing to do
};

VersionType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(".");
    operator.transpile(transpiler);
    transpiler.append("(");
    right.transpile(transpiler);
    transpiler.append(")");
};

exports.VersionType = VersionType;
