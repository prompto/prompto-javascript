var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var Integer = require("./Integer").Integer;
var Value = require("./Value").Value;

function Cursor(context, itemType, docs) {
    Value.call(this, new CursorType(itemType));
    this.context = context;
    this.documents = docs;
    this.mutable = itemType.mutable || false;
    return this;
};

Cursor.prototype = Object.create(Value.prototype);
Cursor.prototype.constructor = Cursor;


Cursor.prototype.isEmpty = function() {
    return this.length()==0;
};

Cursor.prototype.length = function() {
    return this.documents.length();
};

Cursor.prototype.getIterator = function() {
    return this;
};


Cursor.prototype.hasNext = function() {
    return this.documents.hasNext();
};

Cursor.prototype.next = function() {
    var stored = this.documents.next();
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


Cursor.prototype.getMember = function(context, name) {
    if ("count" == name)
        return new Integer(this.length());
    else
        throw new InvalidDataError("No such member:" + name);
};

exports.Cursor = Cursor;