var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var Integer = require("./Integer").Integer;
var Value = require("./Value").Value;

function Cursor(context, itemType, iterDocs) {
    Value.call(this, new CursorType(itemType));
    this.context = context;
    this.iterDocuments = iterDocs;
    this.mutable = itemType.mutable || false;
    return this;
};

Cursor.prototype = Object.create(Value.prototype);
Cursor.prototype.constructor = Cursor;


Cursor.prototype.isEmpty = function() {
    return this.length()==0;
};

Cursor.prototype.count = function() {
    return this.iterDocuments.count();
};


Cursor.prototype.totalCount = function() {
    return this.iterDocuments.totalCount();
};


Cursor.prototype.getIterator = function() {
    return this;
};


Cursor.prototype.hasNext = function() {
    return this.iterDocuments.hasNext();
};

Cursor.prototype.next = function() {
    var stored = this.iterDocuments.next();
    var itemType = this.readItemType(stored);
    return itemType.newInstanceFromStored(this.context, stored);
};

Cursor.prototype.readItemType = function(stored) {
    var categories = stored["category"] || null;
    var category = categories[categories.length-1];
    var typ = new CategoryType(new Identifier(category));
    typ.mutable = this.mutable;
    return typ;
};


Cursor.prototype.getMemberValue = function(context, name) {
    if ("count" == name)
        return new Integer(this.count());
    else if ("totalCount" == name)
        return new Integer(this.totalCount());
    else
        throw new InvalidDataError("No such member:" + name);
};

exports.Cursor = Cursor;