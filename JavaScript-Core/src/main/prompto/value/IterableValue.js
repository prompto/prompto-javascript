import Value from './Value.js'
import { IntegerValue, ListValue } from './index.js'
import { IteratorType } from '../type/index.js'
import { Variable } from '../runtime/index.js'

export default class IterableValue extends Value {

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

    getMemberValue(context, name) {
        if ("count" === name)
            return new IntegerValue(this.count);
        else
            return super.getMemberValue(context, name);
    }

    filter(filter) {
        const list = this.toListValue();
        return list.filter(filter);
    }

    toListValue() {
        const items = [];
        const iterator = this.getIterator();
        while(iterator.hasNext())
            items.push(iterator.next());
        return new ListValue(this.itemType, items);
    }

    toString() {
        const values = [];
        const iterator = this.getIterator();
        while(iterator.hasNext())
            values.push(iterator.next());
        return values.join(", ");
    }
}
