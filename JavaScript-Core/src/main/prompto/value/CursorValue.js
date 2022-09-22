import Value from './Value.ts'
import { IntegerValue, ListValue, IteratorValue } from './index.ts'
import { CursorType, CategoryType } from '../type'
import { Identifier } from '../grammar'

export default class CursorValue extends Value {

    constructor(context, itemType, iterable) {
        super(new CursorType(itemType));
        this.context = context;
        this.iterable = iterable;
        this.mutable = itemType.mutable || false;
    }

    isEmpty() {
        return this.length() === 0;
    }

    count() {
        return this.iterable.count();
    }

    totalCount() {
        return this.iterable.totalCount();
    }

    toString() {
        const list = [];
        while(this.hasNext())
            list.push(this.next().toString());
        return '[' + list.join(", ") + ']';
    }

    getIterator() {
        return new CursorIterator(this);
    }

    readItemType(stored) {
        const categories = stored["category"] || null;
        const category = categories[categories.length-1];
        const type = new CategoryType(new Identifier(category));
        type.mutable = this.mutable;
        return type;
    }

    getMemberValue(context, id) {
        switch(id.name) {
            case "count":
                return new IntegerValue(this.count());
            case "totalCount":
                return new IntegerValue(this.totalCount());
            default:
                return super.getMemberValue(context, id);
        }
    }

    filter(filter) {
        const result = new ListValue(this.type.itemType);
        const iter = this.getIterator();
        while(iter.hasNext()) {
            const current = iter.next();
            if (filter(current))
                result.add(current);
        }
        return result;
    }

    toListValue() {
        const result = new ListValue(this.type.itemType);
        const iter = this.getIterator();
        while(iter.hasNext())
            result.add(iter.next());
        return result;
    }

    toSetValue() {
        return this.toListValue().toSetValue();
    }
}

class CursorIterator extends IteratorValue {

    constructor(cursor) {
        super(cursor.type.itemType, cursor.iterable.iterator());
        this.cursor = cursor;
    }

    next() {
        const stored = this.iterator.next();
        const itemType = this.cursor.readItemType(stored);
        return itemType.newInstanceFromStored(this.cursor.context, stored);
    }
}

