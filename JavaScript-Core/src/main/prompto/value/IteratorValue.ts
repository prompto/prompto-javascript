import BaseValue from './BaseValue'
import {IteratorType, IType} from '../type'
import {IValue, IIterator, ListValue} from "./index";

/* thin wrapper to expose an iterator as a prompto value */
export default class IteratorValue extends BaseValue<IIterator<IValue>> {

    constructor(itemType: IType, iterator: IIterator<IValue>) {
        super(new IteratorType(itemType), iterator);
    }

    hasNext() {
        return this.value.hasNext();
    }

    next() {
        return this.value.next();
    }

    toListValue() {
        const items = [];
        while(this.hasNext())
            items.push(this.next());
        return new ListValue((this.type as IteratorType).itemType, false, items);
    }

    toSetValue() {
        return this.toListValue().toSetValue();
    }

}

