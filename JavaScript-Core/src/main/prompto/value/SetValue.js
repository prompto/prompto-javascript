import Container from './Container.js'
import { IntegerValue, ListValue } from './index.js'
import { SyntaxError, IndexOutOfRangeError } from '../error/index.js'
import { SetType } from '../type/index.js'
import { StrictSet } from '../intrinsic/index.js'

export default class SetValue extends Container {

    constructor(itemType, items) {
        super(new SetType(itemType));
        this.itemType = itemType;
        this.items = items || new StrictSet();
    }

    toArray() {
        return this.items.toArray();
    }

    add(item) {
        this.items.add(item);
    }

    toString() {
        return this.items.toString();
    }

    size() {
        return this.items.length;
    }

    getMemberValue(context, name) {
        if ("count"==name) {
            return new IntegerValue(this.items.length);
        } else {
            return super.getMemberValue(context, name);
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

    hasItem(context, item) {
        return this.items.has(item);
    }

    getItemInContext(context, index) {
        if (index instanceof IntegerValue) {
            const idx = index.IntegerValue();
            const items = Array.from(this.items.set.values());
            if(idx<1 || idx>items.length)
                throw new IndexOutOfRangeError();
            return items[idx-1];
        } else
            throw new SyntaxError("No such item:" + index.toString());
    }

    Add(context, value) {
        if (value instanceof SetValue || value instanceof ListValue) {
            const set = new StrictSet();
            set.addItems(this.items);
            set.addItems(value.items);
            return new SetValue(this.type.itemType, set);
        } else {
            return super.Add.apply(this, context, value);
        }
    }

    Subtract(context, value) {
        if (value instanceof ListValue) {
            const setValue = new SetValue(this.type.itemType);
            value = setValue.Add(context, value);
        }
        if (value instanceof SetValue) {
            const set = new StrictSet();
            const iter = this.items.iterator();
            while(iter.hasNext()) {
                const item = iter.next();
                if(!value.items.has(item))
                    set.set.add(item);
            }
            return new SetValue(this.type.itemType, set);
        } else {
            return super.Subtract.apply(this, context, value);
        }
    }

    filter(filter) {
        const items = Array.from(this.items.set).filter(filter);
        const result = new StrictSet(items);
        return new SetValue(this.type.itemType, result);
    }

    getIterator(context) {
        return this.items.iterator();
    }

    equals(obj) {
        if(obj instanceof SetValue) {
            return this.items.equals(obj.items);
        } else {
            return false;
        }
    }
}

