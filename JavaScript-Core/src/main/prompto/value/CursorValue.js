import Value from "./Value"
import { IntegerValue, ListValue, IteratorValue } from "./index"
import { CursorType, CategoryType } from "../type/index"
import { InvalidDataError } from "../error/index"
import { Identifier } from "../grammar/index"

export default class CursorValue extends Value {

    constructor(context, itemType, iterable) {
        super(new CursorType(itemType));
        this.context = context;
        this.iterable = iterable;
        this.mutable = itemType.mutable || false;
    }

    isEmpty() {
        return this.length()==0;
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
        const typ = new CategoryType(new Identifier(category));
        typ.mutable = this.mutable;
        return typ;
    }

    getMemberValue(context, name) {
        if ("count" == name)
            return new IntegerValue(this.count());
        else if ("totalCount" == name)
            return new IntegerValue(this.totalCount());
        else
            throw new InvalidDataError("No such member:" + name);
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

    toListValue(context) {
        const result = new ListValue(this.type.itemType);
        const iter = this.getIterator();
        while(iter.hasNext())
            result.add(iter.next());
        return result;
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

