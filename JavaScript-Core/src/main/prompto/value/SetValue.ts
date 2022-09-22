import Container from './Container'
import { IntegerValue, ListValue } from './index'
import { SyntaxError, IndexOutOfRangeError } from '../error'
import {SetType, Type} from '../type'
import { StrictSet, Iterator } from '../intrinsic'
import Value from "./Value";
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {JsonNode} from "../json";

export default class SetValue extends Container<StrictSet<Value>> {

    constructor(itemType: Type, items?: Value[] | StrictSet<Value>) {
        let value: StrictSet<Value>;
        if (items instanceof StrictSet<Value>)
            value = items;
        else if(Array.isArray(items))
            value = new StrictSet<Value>(items);
        else
            value = new StrictSet<Value>();
        super(new SetType(itemType), value, false);
    }

    get items(): Value[] {
        return this.value.toArray();
    }

    add(item: Value): void {
        this.value.add(item);
    }

    toString(): string {
        return this.value.toString();
    }

    size(): number {
        return this.value.length;
    }

    getMemberValue(context: Context, id: Identifier): Value {
        if ("count" === id.name) {
            return new IntegerValue(this.value.length);
        } else {
            return super.getMemberValue(context, id);
        }
    }

    isEmpty(): boolean {
        return this.value.length === 0;
    }

    hasValue(context: Context, value: Value): boolean {
        return this.value.has(value);
    }

    getItemInContext(context: Context, index: Value): Value {
        if (index instanceof IntegerValue) {
            const idx = index.IntegerValue();
            const items = this.items;
            if(idx<1 || idx>items.length)
                throw new IndexOutOfRangeError();
            return items[idx-1];
        } else
            throw new SyntaxError("No such item:" + index.toString());
    }

    Add(context: Context, value: Value): Value {
        if (value instanceof SetValue || value instanceof ListValue) {
            const set = new StrictSet();
            set.addItems(this.value);
            set.addItems(value.value);
            return new SetValue(this.itemType, set);
        } else {
            return super.Add.apply(this, context, value);
        }
    }

    Subtract(context: Context, value: Value): Value {
        if (value instanceof ListValue)
            value = new SetValue(this.itemType, value.items);
        if (value instanceof SetValue) {
            const set = new StrictSet();
            const iter = this.value.iterator();
            while(iter.hasNext()) {
                const item = iter.next();
                if(!value.items.has(item))
                    set.set.add(item);
            }
            return new SetValue(this.itemType, set);
        } else {
            return super.Subtract(context, value);
        }
    }

    filter(filter: (value: Value) => boolean) {
        const items = this.items.filter(filter);
        const result = new StrictSet(items);
        return new SetValue(this.itemType, result);
    }

    getIterator(context: Context): Iterator<Value> {
        return this.value.iterator();
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

