var CategoryType = require("../type/CategoryType").CategoryType;
var Value = require("./Value").Value;

function NativeInstance(declaration, instance) {
	Value.call(this,new CategoryType(declaration.name));
	this.declaration = declaration;
	this.instance = instance || this.makeInstance();
	return this;
}

NativeInstance.prototype = Object.create(Value.prototype);
NativeInstance.prototype.constructor = NativeInstance;

NativeInstance.prototype.makeInstance = function() {
	var mapped = this.declaration.getMapped(true);
	return mapped.prototype.constructor();
};

NativeInstance.prototype.getType = function() {
	return new CategoryType(this.declaration.name);
};

/*

@Override
public Set<String> getAttributeNames() {
	// TODO Auto-generated method stub
	return null;
}

*/

NativeInstance.prototype.getMember = function(context, attrName) {
	var value = this.instance[attrName];
	return Value.convertFromJavaScript(value);
};


NativeInstance.prototype.setMember = function(context, attrName, value) {
	value = value.convertToJavaScript();
	this.instance[attrName] = value;
};


exports.NativeInstance = NativeInstance;
