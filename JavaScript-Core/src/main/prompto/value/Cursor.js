var CursorType = require("../type/CursorType").CursorType;
var Integer = require("./Integer").Integer;
var Value = require("./Value").Value;

function Cursor(context, itemType, docs) {
    Value.call(this, new CursorType(itemType));
    this.context = context;
    this.documents = docs;
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
    var doc = this.documents.next();
    return this.type.itemType.newInstanceFromDocument(this.context, doc);
};

Cursor.prototype.getMember = function(context, name) {
    if ("length" == name)
        return new Integer(this.length());
    else
        throw new InvalidDataError("No such member:" + name);
};

exports.Cursor = Cursor;