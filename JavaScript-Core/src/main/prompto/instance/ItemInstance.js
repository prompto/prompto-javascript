var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var IntegerType = require("../type/IntegerType").IntegerType;
var AnyType = require("../type/AnyType").AnyType;
var BaseValueList = require("../value/BaseValueList").BaseValueList;
var Integer = require("../value/Integer").Integer;
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

ItemInstance.prototype.checkAssignValue = function(context, valueType) {
    var itemType = this.item.check(context);
	return this.parent.checkAssignItem(context, itemType, valueType);
};

ItemInstance.prototype.checkAssignMember = function(context, name, valueType) {
    return AnyType.instance
};

ItemInstance.prototype.checkAssignItem = function(context, itemType, valueType) {
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

exports.ItemInstance = ItemInstance;
