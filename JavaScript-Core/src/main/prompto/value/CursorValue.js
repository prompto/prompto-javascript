var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var IntegerValue = require("./IntegerValue").IntegerValue;
var Value = require("./Value").Value;
var ListValue = require("./ListValue").ListValue;
var BooleanValue = require("./BooleanValue").BooleanValue;

function CursorValue(context, itemType, iterDocuments) {
    Value.call(this, new CursorType(itemType));
    this.context = context;
    this.iterDocuments = iterDocuments;
    this.mutable = itemType.mutable || false;
    return this;
};

CursorValue.prototype = Object.create(Value.prototype);
CursorValue.prototype.constructor = CursorValue;


CursorValue.prototype.isEmpty = function() {
    return this.length()==0;
};

CursorValue.prototype.count = function() {
    return this.iterDocuments.count();
};


CursorValue.prototype.totalCount = function() {
    return this.iterDocuments.totalCount();
};


CursorValue.prototype.toString = function() {
    var list = [];
    while(this.hasNext())
        list.push(this.next().toString());
    return '[' + list.join(", ") + ']';
};


CursorValue.prototype.getIterator = function() {
    return this;
};


CursorValue.prototype.hasNext = function() {
    return this.iterDocuments.hasNext();
};

CursorValue.prototype.next = function() {
    var stored = this.iterDocuments.next();
    var itemType = this.readItemType(stored);
    return itemType.newInstanceFromStored(this.context, stored);
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
    var cursor = new CursorValue(this.context, this.type.itemType, this.iterDocuments);
    cursor.source = this;
    cursor.current = null;
    cursor.hasNext = function() {
        this.current = null;
        while(this.source.hasNext()) {
            var current = this.source.next();
            if(filter(current)) {
                this.current = current;
                return true;
            }
        }
        return false;
    };
    cursor.next = function() {
        return this.current;
    };
    return cursor;
};


CursorValue.prototype.toListValue = function(context) {
    var result = new ListValue(this.type.itemType);
    var iter = this.getIterator();
    while(iter.hasNext())
        result.add(iter.next());
    return result;
};

exports.CursorValue = CursorValue;