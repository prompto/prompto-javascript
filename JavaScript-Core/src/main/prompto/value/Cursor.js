var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var Integer = require("./Integer").Integer;
var Value = require("./Value").Value;
var BooleanValue = require("./BooleanValue").BooleanValue;

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


Cursor.prototype.toString = function() {
    var list = [];
    while(this.hasNext())
        list.push(this.next().toString());
    return '[' + list.join(", ") + ']';
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

Cursor.prototype.filter = function(context, itemId, filter) {
    var cursor = new Cursor(this.context, this.type.itemType, this.iterDocuments);
    cursor.superHasNext = cursor.hasNext;
    cursor.hasNext = function() {
        this.current = null;
        while(this.superHasNext()) {
            this.current = this.superNext();
            context.setValue(itemId, this.current);
            var test = filter.interpret(context);
            if(!(test instanceof BooleanValue)) {
                throw new InternalError("Illegal test result: " + test);
            }
            if(test.value)
                return true;
        }
        this.current = null;
        return false;
    };
    cursor.superNext = cursor.next;
    cursor.next = function() {
        return this.current;
    };
    return cursor;
};

exports.Cursor = Cursor;