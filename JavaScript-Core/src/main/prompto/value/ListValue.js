var BaseValueList = require("./BaseValueList").BaseValueList;
var BooleanValue = require("./BooleanValue").BooleanValue;
var Integer = require("./Integer").Integer;
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
        var items = this.items.concat([]);
        for(var name in value.items) {
            items.push(value.items[name]);
        }
        return new ListValue(this.type.itemType, items);
    } else {
		return BaseValueList.prototype.Add.apply(this, context, value);
	}
};

ListValue.prototype.Multiply = function(context, value) {
	if (value instanceof Integer) {
		var count = value.value;
		if (count < 0) {
			throw new SyntaxError("Negative repeat count:" + count);
		} else if (count == 0) {
			return new ListValue(this.type.itemType);
		} else if (count == 1) {
			return this;
		} else {
			var items = [];
			while(--count>=0) {
				items = items.concat(this.items);
			}
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

ListValue.prototype.filter = function(context, itemId, filter) {
    var result = new ListValue(this.type.itemType);
    var iter = this.getIterator(context);
    while(iter.hasNext()) {
        var o = iter.next();
        context.setValue(itemId, o);
        var test = filter.interpret(context);
        if(!(test instanceof BooleanValue)) {
            throw new InternalError("Illegal test result: " + test);
        }
        if(test.value) {
            result.add(o);
        }
    }
    return result;
}

exports.ListValue = ListValue;

