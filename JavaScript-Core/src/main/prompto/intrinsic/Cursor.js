function Cursor(mutable, iterable) {
    this.mutable = mutable || false;
    this.iterable = iterable;
    return this;
}

Object.defineProperty(Cursor.prototype, "count", {
    get: function() { return this.iterable.count(); }
});

Object.defineProperty(Cursor.prototype, "totalCount", {
    get: function() { return this.iterable.totalCount(); }
});

Cursor.prototype.iterator = function() {
    return this;
};

Cursor.prototype.hasNext = function() {
    return this.iterable.hasNext();
};

Cursor.prototype.next = function() {
    var stored = this.iterable.next();
    if(!stored)
        return null;
    var name = stored.getData('category').slice(-1)[0];
    var type = eval(name);
    var value = new type();
    value.fromStored(stored);
    value.mutable = this.mutable;
    return value;
};


exports.Cursor = Cursor;
