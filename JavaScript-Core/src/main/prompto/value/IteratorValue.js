
/* thin wrapper to expose an iterator as a prompto value */
export default class IteratorValue extends Value {

    constructor(itemType, iterator) {
        super(new IteratorType(itemType));
        this.iterator = iterator;
    }

    hasNext() {
        return this.iterator.hasNext();
    }

    next() {
        return this.iterator.next();
    }
}

