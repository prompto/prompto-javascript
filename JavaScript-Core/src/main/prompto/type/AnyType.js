var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function AnyType() {
 	NativeType.call(this, new Identifier("any"));
 	return this;
 }

 AnyType.prototype = Object.create(NativeType.prototype);
 AnyType.prototype.constructor = AnyType;

 AnyType.instance = new AnyType();
	


AnyType.prototype.checkItem = function(context, item) {
	return AnyType.instance; // required to support Document items
};


AnyType.prototype.declareItem = function(transpiler, type, item) {
    // required to support Document items
    type.declare(transpiler);
    item.declare(transpiler);
};


AnyType.prototype.transpileItem = function(transpiler, type, item) {
    // required to support Document items
    transpiler.append(".item(").append(item).append(")");
};


AnyType.prototype.checkMember = function(context, name) {
	// required to support Document members
    return AnyType.instance;
};


AnyType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    // required to support Document members
    transpiler.append(".setMember('").append(name).append("', ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


AnyType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    // required to support Document members
    transpiler.append(".setItem(").append(item).append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


AnyType.prototype.isAssignableFrom = function(context, other) {
	return true;
};

exports.AnyType = AnyType;
