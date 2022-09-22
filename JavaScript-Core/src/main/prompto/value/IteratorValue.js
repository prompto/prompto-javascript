import Value from './Value.ts'
import { IteratorType } from '../type'
import {ListValue, SetValue} from "../value";
import {StrictSet} from "../intrinsic";

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

    toListValue() {
        const items = [];
        while(this.hasNext())
            items.push(this.next());
        return new ListValue(this.itemType, items);
    }

    toSetValue() {
        const items = new StrictSet();
        while(this.hasNext())
            items.add(this.next());
        return new SetValue(this.itemType, items);
    }

}

