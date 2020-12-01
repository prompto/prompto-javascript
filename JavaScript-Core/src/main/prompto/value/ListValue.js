import BaseValueList from './BaseValueList.js'
import { SetValue, IntegerValue } from './index.js'
import { SyntaxError } from '../error/index.js'
import { ListType } from '../type/index.js'
import { List } from '../intrinsic/index.js'
import { multiplyArray } from '../utils/Utils.js'

export default class ListValue extends BaseValueList {
 
    constructor(itemType, items, item, mutable) {
        super(new ListType(itemType), items, item, mutable);
        this.storables = null;
    }

    newInstance(items) {
        return new ListValue(this.type.itemType, items);
    }

    getStorableData() {
        if(this.storables == null)
            this.storables = this.items.map(item => item.getStorableData());
        return this.storables;
    }

    collectStorables(list) {
        this.items.map(item => {
            item.collectStorables(list);
        });
    }

    convertToJavaScript() {
        const items = this.items.map(value => value.convertToJavaScript(), this);
        return new List(this.mutable, items);
    }

    Add(context, value) {
        if (value instanceof ListValue) {
            const items = this.items.concat(value.items);
            return new ListValue(this.type.itemType, items);
        } else if(value instanceof SetValue) {
            const items1 = Array.from(value.items.set.values());
            const items2 = this.items.concat(items1);
            return new ListValue(this.type.itemType, items2);
        } else {
            return super.Add.apply(this, context, value);
        }
    }

    Subtract(context, value) {
        if (value instanceof ListValue) {
            const setValue = new SetValue(this.type.itemType);
            value = setValue.Add(context, value);
        }
        if(value instanceof SetValue) {
            const items = this.items.filter(item => !value.items.has(item));
            return new ListValue(this.type.itemType, items);
        } else {
            return super.Subtract.apply(this, context, value);
        }
    }

    removeItem(item) {
        this.items.splice(item.value -1, 1);
    }

    removeValue(value) {
        const idx = this.items.indexOf(value);
        if(idx > -1)
            this.items.splice(idx, 1);
    }

    Multiply(context, value) {
        if (value instanceof IntegerValue) {
            const count = value.value;
            if (count < 0) {
                throw new SyntaxError("Negative repeat count:" + count);
            } else {
                const items = multiplyArray(this.items, count);
                return new ListValue(this.type.itemType, items);
            }
        } else {
            return super.Multiply.apply(this, context, value);
        }
    }

    toDialect(writer) {
        writer.append('[');
        super.toDialect(writer);
        writer.append(']');
    }

    filter(filter) {
        const items = this.items.filter(filter);
        return new ListValue(this.type.itemType, items);
    }
}


