import Container from './Container'
import {IIterator, IntegerValue, ListValue} from './index'
import { SyntaxError, IndexOutOfRangeError } from '../error'
import {SetType, IType} from '../type'
import { StrictSet } from '../intrinsic'
import IValue from "./IValue";
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {JsonNode} from "../json";

export default class SetValue extends Container<StrictSet<IValue>> {

    constructor(itemType: IType, items?: IValue[] | StrictSet<IValue>) {
        let value: StrictSet<IValue>;
        if (items instanceof StrictSet<IValue>)
            value = items;
        else if(Array.isArray(items))
            value = new StrictSet<IValue>(items);
        else
            value = new StrictSet<IValue>();
        super(new SetType(itemType), value, false);
    }

    get items(): IValue[] {
        return this.value.toArray();
    }

    add(item: IValue): void {
        this.value.add(item);
    }

    toString(): string {
        return this.value.toString();
    }

    size(): number {
        return this.value.length;
    }

    GetMemberValue(context: Context, id: Identifier): IValue {
        if ("count" == id.name) {
            return new IntegerValue(this.value.length);
        } else {
            return super.GetMemberValue(context, id);
        }
    }

    isEmpty(): boolean {
        return this.value.length == 0;
    }

    hasValue(context: Context, value: IValue): boolean {
        return this.value.has(value);
    }

    GetItemValue(context: Context, index: IValue): IValue {
        if (index instanceof IntegerValue) {
            const idx = index.IntegerValue();
            const items = this.items;
            if(idx<1 || idx>items.length)
                throw new IndexOutOfRangeError();
            return items[idx-1];
        } else
            throw new SyntaxError("No such item:" + index.toString());
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof SetValue || value instanceof ListValue) {
            const set = new StrictSet<IValue>();
            set.addItems(this.value);
            set.addItems(value.value);
            return new SetValue(this.itemType, set);
        } else {
            return super.Add(context, value);
        }
    }

    Subtract(context: Context, value: IValue): IValue {
        if (value instanceof ListValue)
            value = new SetValue(this.itemType, value.items);
        if (value instanceof SetValue) {
            const set = new StrictSet<IValue>();
            const iter = this.value.getIterator();
            const items = value.value;
            while(iter.hasNext()) {
                const item = iter.next();
                if(!items.has(item))
                    set.add(item);
            }
            return new SetValue(this.itemType, set);
        } else {
            return super.Subtract(context, value);
        }
    }

    filter(filter: (value: IValue) => boolean) {
        const items = this.items.filter(filter);
        const result = new StrictSet(items);
        return new SetValue(this.itemType, result);
    }

    getIterator(context: Context): IIterator<IValue> {
        return this.value.getIterator();
    }

    equals(obj: any): boolean {
        if(obj instanceof SetValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toListValue(): ListValue {
        return new ListValue(this.itemType, false, this.items);
    }

    toJsonNode(): JsonNode {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.items.map(item => item.toJsonNode());
    }

    getStorableData(): any {
        return this.items.map(item => item.getStorableData()) as never;
    }


}

