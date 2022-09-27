import IValue from '../../../main/prompto/value/IValue.ts'
import { IntegerValue, ListValue, SetValue } from './index.ts'
import { IteratorType } from '../type'
import { Variable } from '../runtime'
import { StrictSet } from '../intrinsic'

export default class IterableValue extends IValue {

    constructor(context, name, itemType, source, length, expression) {
        // TODO should this not be IterableType ?
        super(new IteratorType(itemType));
        this.context = context;
        this.name = name;
        this.itemType = itemType;
        this.source = source;
        this.count = length;
        this.expression = expression;
    }

    isEmpty() {
        return this.count===0;
    }

    length() {
        return this.count;
    }

    getIterator() {
        return this;
    }

    hasNext() {
        return this.source.hasNext();
    }

    next() {
        const child = this.context.newChildContext();
        child.registerValue(new Variable(this.name, this.itemType));
        child.setValue(this.name, this.source.next());
        return this.expression.interpret(child);
    }

    getMemberValue(context, id) {
        if ("count" === id.name)
            return new IntegerValue(this.count);
        else
            return super.getMemberValue(context, id);
    }

    filter(filter) {
        const list = this.toListValue();
        return list.filter(filter);
    }

    toString() {
        const values = [];
        const iterator = this.getIterator();
        while(iterator.hasNext())
            values.push(iterator.next());
        return values.join(", ");
    }

    toListValue() {
        const items = [];
        const iterator = this.getIterator();
        while(iterator.hasNext())
            items.push(iterator.next());
        return new ListValue(this.itemType, items);
    }

    toSetValue() {
        const items = new StrictSet();
        const iterator = this.getIterator();
        while(iterator.hasNext())
            items.add(iterator.next());
        return new SetValue(this.itemType, items);
    }


}
