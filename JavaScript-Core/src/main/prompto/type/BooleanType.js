var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;
var BooleanValue = null;

exports.resolve = function() {
    BooleanValue = require("../value/BooleanValue").BooleanValue;
}

function BooleanType()  {
	NativeType.call(this, new Identifier("Boolean"));
	return this;
}

BooleanType.prototype = Object.create(NativeType.prototype);
BooleanType.prototype.constructor = BooleanType;

BooleanType.instance = new BooleanType();

BooleanType.prototype.checkAnd = function(context, other) {
	if(other instanceof BooleanType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkAnd.call(this, context, other);
	}
};

BooleanType.prototype.checkOr = function(context, other) {
	if(other instanceof BooleanType) {
		return BooleanType.instance;
	} else {
		return NativeType.prototype.checkOr.call(this, context, other);
	}
};

BooleanType.prototype.checkNot = function(context) {
	return BooleanType.instance;
};


BooleanType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	if (typeof(value)=='boolean') {
		return BooleanValue.ValueOf(value);
	} else {
		return value; // TODO for now
	}
};

BooleanType.prototype.declare = function(transpiler) {
    var isABoolean = require("../utils/Utils").isABoolean;
    transpiler.require(isABoolean);
};


BooleanType.prototype.transpile = function(transpiler) {
    transpiler.append('"Boolean"');
};

BooleanType.prototype.transpileSorted = function(transpiler, desc, key) {
    if(desc)
        transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
    else
        transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? 1 : -1; }");
};


exports.BooleanType = BooleanType;