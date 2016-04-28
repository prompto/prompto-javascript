var Value = require("./Value").Value;
var IteratorType = require("../type/IteratorType").IteratorType;

/* thin wrapper to expose an iterator as a prompto value */
function IteratorValue(itemType, source) {
    Value.call(this, new IteratorType(itemType));
    this.source = source;
    return this;
}

IteratorValue.prototype = Object.create(Value.prototype);
IteratorValue.prototype.constructor = IteratorValue;

IteratorValue.prototype.hasNext = function() {
    return this.source.hasNext();
};

IteratorValue.prototype.next = function() {
    return this.source.next();
};

exports.IteratorValue = IteratorValue;
