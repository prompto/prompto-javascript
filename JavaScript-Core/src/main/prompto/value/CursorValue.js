var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var IntegerValue = require("./IntegerValue").IntegerValue;
var Value = require("./Value").Value;
var ListValue = require("./ListValue").ListValue;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var IteratorValue = require("./IteratorValue").IteratorValue;

function CursorValue(context, itemType, iterable) {
    Value.call(this, new CursorType(itemType));
    this.context = context;
    this.iterable = iterable;
    this.mutable = itemType.mutable || false;
    return this;
}

CursorValue.prototype = Object.create(Value.prototype);
CursorValue.prototype.constructor = CursorValue;


CursorValue.prototype.isEmpty = function() {
    return this.length()==0;
};

CursorValue.prototype.count = function() {
    return this.iterable.count();
};


CursorValue.prototype.totalCount = function() {
    return this.iterable.totalCount();
};


CursorValue.prototype.toString = function() {
    var list = [];
    while(this.hasNext())
        list.push(this.next().toString());
    return '[' + list.join(", ") + ']';
};


CursorValue.prototype.getIterator = function() {
    return new CursorIterator(this);
};

CursorValue.prototype.readItemType = function(stored) {
    var categories = stored["category"] || null;
    var category = categories[categories.length-1];
    var typ = new CategoryType(new Identifier(category));
    typ.mutable = this.mutable;
    return typ;
};


CursorValue.prototype.getMemberValue = function(context, name) {
    if ("count" == name)
        return new IntegerValue(this.count());
    else if ("totalCount" == name)
        return new IntegerValue(this.totalCount());
    else
        throw new InvalidDataError("No such member:" + name);
};

CursorValue.prototype.filter = function(filter) {
    var result = new ListValue(this.type.itemType);
    var iter = this.getIterator();
    while(iter.hasNext()) {
        var current = iter.next();
        if (filter(current))
            result.add(current);
    }
    return result;
};


CursorValue.prototype.toListValue = function(context) {
    var result = new ListValue(this.type.itemType);
    var iter = this.getIterator();
    while(iter.hasNext())
        result.add(iter.next());
    return result;
};


function CursorIterator(cursor) {
    IteratorValue.call(this, cursor.type.itemType, cursor.iterable);
    this.cursor = cursor;
    return this;
}

CursorIterator.prototype = Object.create(IteratorValue.prototype);
CursorIterator.prototype.constructor = CursorIterator;

CursorIterator.prototype.next = function() {
    var stored = this.iterator.next();
    var itemType = this.cursor.readItemType(stored);
    return itemType.newInstanceFromStored(this.cursor.context, stored);
};


exports.CursorValue = CursorValue;