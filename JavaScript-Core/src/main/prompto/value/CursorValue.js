var CategoryType = require("../type/CategoryType").CategoryType;
var CursorType = require("../type/CursorType").CursorType;
var Identifier = require("../grammar/Identifier").Identifier;
var IntegerValue = require("./IntegerValue").IntegerValue;
var Value = require("./Value").Value;
var ListValue = require("./ListValue").ListValue;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var IteratorValue = require("./IteratorValue").IteratorValue;

class CursorValue extends Value {
    constructor(context, itemType, iterable) {
        super(new CursorType(itemType));
        this.context = context;
        this.iterable = iterable;
        this.mutable = itemType.mutable || false;
        return this;
    }

    isEmpty() {
        return this.length()==0;
    }

    count() {
        return this.iterable.count();
    }

    totalCount() {
        return this.iterable.totalCount();
    }

    toString() {
        var list = [];
        while(this.hasNext())
            list.push(this.next().toString());
        return '[' + list.join(", ") + ']';
    }

    getIterator() {
        return new CursorIterator(this);
    }

    readItemType(stored) {
        var categories = stored["category"] || null;
        var category = categories[categories.length-1];
        var typ = new CategoryType(new Identifier(category));
        typ.mutable = this.mutable;
        return typ;
    }

    getMemberValue(context, name) {
        if ("count" == name)
            return new IntegerValue(this.count());
        else if ("totalCount" == name)
            return new IntegerValue(this.totalCount());
        else
            throw new InvalidDataError("No such member:" + name);
    }

    filter(filter) {
        var result = new ListValue(this.type.itemType);
        var iter = this.getIterator();
        while(iter.hasNext()) {
            var current = iter.next();
            if (filter(current))
                result.add(current);
        }
        return result;
    }

    toListValue(context) {
        var result = new ListValue(this.type.itemType);
        var iter = this.getIterator();
        while(iter.hasNext())
            result.add(iter.next());
        return result;
    }
}

class CursorIterator extends IteratorValue {
    constructor(cursor) {
        super(cursor.type.itemType, cursor.iterable.iterator());
        this.cursor = cursor;
        return this;
    }

    next() {
        var stored = this.iterator.next();
        var itemType = this.cursor.readItemType(stored);
        return itemType.newInstanceFromStored(this.cursor.context, stored);
    }
}


exports.CursorValue = CursorValue;