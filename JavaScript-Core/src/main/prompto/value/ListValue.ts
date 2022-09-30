import BaseValueList from './BaseValueList'
import {NullValue, SetValue, IntegerValue, IValue} from './index'
import { SyntaxError } from '../error'
import {ListType, IType} from '../type'
import { List } from '../intrinsic'
import { multiplyArray } from '../utils/Utils'
import { StrictSet } from '../intrinsic'
import {IStorable} from "../store";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";

export default class ListValue extends BaseValueList<ListValue> {
 
    constructor(itemType: IType, mutable = false, items?: IValue[], item?: IValue) {
        super(new ListType(itemType), mutable, items, item);
    }

    newInstance(items: IValue[]): ListValue {
        return new ListValue(this.itemType, false, items);
    }

    getStorableData(): any {
        return this.value.map(item => item.getStorableData()) as never;
    }

    collectStorables(storables: Set<IStorable>): void {
        this.value.forEach(item => item.collectStorables(storables));
    }

    convertToJavaScript(): any {
        const items = this.items.map(value => value.convertToJavaScript(), this);
        return new List(this.mutable, items) as never;
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof ListValue) {
            const items = this.value.concat(value.value);
            return new ListValue(this.itemType, this.mutable, items);
        } else if(value instanceof SetValue) {
            const items = this.value.concat(Array.from(value.items));
            return new ListValue(this.itemType, this.mutable, items);
        } else {
            return super.Add(context, value);
        }
    }

    Subtract(context: Context, value: IValue): IValue {
        if (value instanceof ListValue)
            value = new SetValue(this.itemType, value.items);
        if(value instanceof SetValue) {
            const items = this.value.filter(item => !(value as SetValue).hasValue(context, item));
            return new ListValue(this.itemType, false, items);
        } else {
            return super.Subtract(context, value);
        }
    }

    removeItem(item: IntegerValue): void {
        this.items.splice(item.value -1, 1);
    }

    removeValue(value: IValue): void {
        const idx = this.findIndex(value);
        if(idx > -1)
            this.items.splice(idx, 1);
    }

    addValue(value: IValue): void {
        this.items.push(value);
    }

    insertValue(value: IValue, atIndex: IntegerValue): void {
        this.items.splice(atIndex.value -1, 0, value);
    }

    indexOfValue(value: IValue): IValue {
        const idx = this.findIndex(value);
        return idx < 0 ? NullValue.instance : new IntegerValue(idx + 1);
    }

    findIndex(value: IValue): number {
        for(let i=0;i<this.items.length;i++) {
            const item = this.items[i];
            if(item==value || (item && item.equals && item.equals(value)))
                return i;
        }
        return -1;
    }

    Multiply(context: Context, value: IValue): IValue {
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

    toDialect(writer: CodeWriter): void {
        writer.append('[');
        super.toDialect(writer);
        writer.append(']');
    }

    filter(filter: (value: IValue) => boolean): ListValue {
        const items = this.items.filter(filter);
        return new ListValue(this.itemType, false, items);
    }

    toSetValue(): SetValue {
        const items = new StrictSet();
        this.items.forEach(item => items.add(item));
        return new SetValue(this.itemType, items);
    }

    toJsonNode() {
        return this.items.map(item => item.toJsonNode());
    }

}


