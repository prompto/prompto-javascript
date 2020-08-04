var Value = require("./Value").Value;
var IteratorType = require("../type/IteratorType").IteratorType;

/* thin wrapper to expose an iterator as a prompto value */
class IteratorValue extends Value {
    constructor(itemType, iterator) {
        super(new IteratorType(itemType));
        this.iterator = iterator;
        return this;
    }

    hasNext() {
        return this.iterator.hasNext();
    }

    next() {
        return this.iterator.next();
    }
}

exports.IteratorValue = IteratorValue;
