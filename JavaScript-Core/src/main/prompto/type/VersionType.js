var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var Version = require("../intrinsic/Version").Version;
var VersionValue = require("../value/VersionValue").VersionValue;

function VersionType()  {
	NativeType.call(this, new Identifier("Version"));
	return this;
}

VersionType.prototype = Object.create(NativeType.prototype);
VersionType.prototype.constructor = VersionType;

VersionType.instance = new VersionType();

VersionType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    if(value instanceof Version)
        return new VersionValue(value);
    else
        return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
};

VersionType.prototype.checkCompare = function(context, other, section) {
	if (other instanceof VersionType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkCompare.call(this, context, other, section);
	}
};


VersionType.prototype.declare = function(transpiler) {
    transpiler.register(Version);
};


VersionType.prototype.transpile = function(transpiler) {
    transpiler.append('Version')
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
