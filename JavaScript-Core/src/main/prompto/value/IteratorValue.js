var Value = require("./Value").Value;
var IteratorType = require("../type/IteratorType").IteratorType;

/* thin wrapper to expose an iterator as a prompto value */
function IteratorValue(itemType, iterable) {
    Value.call(this, new IteratorType(itemType));
    this.iterator = iterable.iterator();
    return this;
}

IteratorValue.prototype = Object.create(Value.prototype);
IteratorValue.prototype.constructor = IteratorValue;

IteratorValue.prototype.hasNext = function() {
    return this.iterator.hasNext();
};

IteratorValue.prototype.next = function() {
    return this.iterator.next();
};

exports.IteratorValue = IteratorValue;
