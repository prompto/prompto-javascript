var BaseValueList = require("./BaseValueList").BaseValueList;
var IntegerValue = require("./IntegerValue").IntegerValue;
var multiplyArray = require("../utils/Utils").multiplyArray;
var ListType = null;
var SetValue = null;

exports.resolve = function() {
    ListType = require("../type/ListType").ListType;
    SetValue = require("./SetValue").SetValue;
};

function ListValue(itemType, items, item, mutable) {
    BaseValueList.call(this, new ListType(itemType), items, item, mutable);
    this.storables = null;
    return this;
}

ListValue.prototype = Object.create(BaseValueList.prototype);
ListValue.prototype.constructor = ListValue;

ListValue.prototype.newInstance = function(items) {
    return new ListValue(this.type.itemType, items);
};

ListValue.prototype.getStorableData = function() {
    if(this.storables == null)
        this.storables = this.items.map(function(item) {
            return item.getStorableData();
        });
    return this.storables;
};

ListValue.prototype.collectStorables = function(list) {
    this.items.map(function(item) {
        item.collectStorables(list);
    });
};


ListValue.prototype.Add = function(context, value) {
    if (value instanceof ListValue) {
        var items = this.items.concat(value.items);
        return new ListValue(this.type.itemType, items);
    } else if(value instanceof SetValue) {
        var items1 = Array.from(value.items.set.values());
        var items2 = this.items.concat(items1);
        return new ListValue(this.type.itemType, items2);
    } else {
        return BaseValueList.prototype.Add.apply(this, context, value);
    }
};


ListValue.prototype.Subtract = function(context, value) {
    if (value instanceof ListValue) {
        var setValue = new SetValue(this.type.itemType);
        value = setValue.Add(context, value);
    }
    if(value instanceof SetValue) {
        var items = this.items.filter(function(item) { return !value.items.has(item); });
        return new ListValue(this.type.itemType, items);
    } else {
        return BaseValueList.prototype.Subtract.apply(this, context, value);
    }
};


ListValue.prototype.Multiply = function(context, value) {
    if (value instanceof IntegerValue) {
        var count = value.value;
        if (count < 0) {
            throw new SyntaxError("Negative repeat count:" + count);
        } else {
            var items = multiplyArray(this.items, count);
            return new ListValue(this.type.itemType, items);
        }
    } else {
        return BaseValueList.prototype.Multiply.apply(this, context, value);
    }
};

ListValue.prototype.toDialect = function(writer) {
    writer.append('[');
    BaseValueList.prototype.toDialect.call(this, writer);
    writer.append(']');
};

ListValue.prototype.filter = function(filter) {
    var items = this.items.filter(filter);
    return new ListValue(this.type.itemType, items);
};

exports.ListValue = ListValue;

