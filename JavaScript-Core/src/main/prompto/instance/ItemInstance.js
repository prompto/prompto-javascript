var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var IntegerType = require("../type/IntegerType").IntegerType;
var AnyType = require("../type/AnyType").AnyType;
var BaseValueList = require("../value/BaseValueList").BaseValueList;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var Value = require("../value/Value").Value;

function ItemInstance(item) {
	this.parent = null;
	this.item = item;
	return this;
}
	
ItemInstance.prototype.toString = function() {
	return this.parent.toString() + "[" + this.item.toString() + "]";
};

ItemInstance.prototype.toDialect = function(writer) {
    this.parent.toDialect(writer);
    writer.append('[');
    this.item.toDialect(writer);
    writer.append(']');
}

ItemInstance.prototype.check = function(context) {
    var parentType = this.parent.check(context);
    var itemType = this.item.check(context);
    return parentType.checkItem(context, itemType);
};


ItemInstance.prototype.checkAssignValue = function(context, valueType, section) {
    var itemType = this.item.check(context);
	return this.parent.checkAssignItem(context, itemType, valueType, section);
};

ItemInstance.prototype.checkAssignMember = function(context, name, valueType, section) {
    return AnyType.instance
};

ItemInstance.prototype.checkAssignItem = function(context, itemType, valueType, section) {
    return AnyType.instance
};

ItemInstance.prototype.assign = function(context, expression) {
	var root = this.parent.interpret(context);
	if(!root.mutable)
		throw new NotMutableError();
	var item = this.item.interpret(context);
    var value = expression.interpret(context);
    if (root.setItemInContext) {
        root.setItemInContext(context, item, value);
    } else {
        throw new SyntaxError("Unknown item/key: " + typeof(item));
    }
};

ItemInstance.prototype.interpret = function(context) {
    var root = this.parent.interpret(context);
    var item = this.item.interpret(context);
    if (root.getItemInContext) {
		return root.getItemInContext(context, item);
	} else {
		throw new SyntaxError("Unknown item/key: " + typeof(item));
	}
};


ItemInstance.prototype.declare = function(transpiler) {
    this.parent.declare(transpiler);
    this.item.declare(transpiler);
};


ItemInstance.prototype.transpile = function(transpiler) {
    this.parent.transpile(transpiler);
    transpiler.append(".item(");
    this.item.transpile(transpiler);
    transpiler.append(")");
};


ItemInstance.prototype.declareAssign = function(transpiler, expression) {
    this.parent.declare(transpiler);
    this.item.declare(transpiler);
    expression.declare(transpiler);
};

ItemInstance.prototype.transpileAssign = function(transpiler, expression) {
    var parentType = this.parent.check(transpiler.context);
    this.parent.transpileAssignParent(transpiler);
    parentType.transpileAssignItemValue(transpiler, this.item, expression);
};


ItemInstance.prototype.transpileAssignParent = function(transpiler) {
    this.parent.transpileAssignParent(transpiler);
    transpiler.append(".getItem(");
    this.item.transpile(transpiler);
    transpiler.append(", true)");
};


exports.ItemInstance = ItemInstance;
