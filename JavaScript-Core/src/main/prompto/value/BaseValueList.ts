import Container from './Container'
import { Value, IntegerValue } from './index'
import { PromptoError, SyntaxError, IndexOutOfRangeError, InternalError } from '../error'
import {ContainerType} from "../type";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import { Iterator } from "../intrinsic";

/* an abstract list of values, common to ListValue and TupleValue */
export default abstract class BaseValueList<T extends BaseValueList<T>> extends Container<Value[]> {

    constructor(type: ContainerType, mutable: boolean, items?: Value[], item?: Value) {
        let value: Value[];
        if(items && item)
            value = items.concat([item]);
        else if(items)
            value = items;
        else if (item)
            value = [item];
        else
            value = [];
        super(type, value, mutable);
    }

    get items(): Value[] {
        return this.value;
    }

    toString(): string {
        return "[" + this.value.join(", ") + "]";
    }

    add(o: Value): void {
        this.value.push(o);
    }

    setItem(index: number, value: Value): void {
        this.value[index] = value;
    }

    setItemInContext(context: Context, index: Value, value: Value): void {
        if (index instanceof IntegerValue) {
            const idx = index.IntegerValue() - 1;
            if (idx > this.value.length) {
                throw new IndexOutOfRangeError();
            }
            this.value[idx] = value;
        } else
            throw new SyntaxError("No such item:" + index.toString())
    }

    get(index: number): Value {
        return this.value[index];
    }

    size(): number {
        return this.value.length;
    }

    isEmpty(): boolean {
        return this.value.length===0;
    }

    slice(fi: IntegerValue, li: IntegerValue): T  {
        const first = this.checkFirst(fi);
        const last = this.checkLast(li);
        const items = this.value.slice(first-1,last);
        return this.newInstance(items);
    }

    abstract newInstance(value: Value[]): T;

    checkFirst(fi: IntegerValue | null): number {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li: IntegerValue | null): number {
        let value = (li == null) ? this.value.length : li.IntegerValue();
        if (value < 0) {
            value = this.value.length + 1 + li!.IntegerValue();
        }
        if (value < 1 || value > this.value.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    hasValue(context: Context, value: Value): boolean {
        for (let i=0;i<this.value.length;i++) {
            if (this.value[i].equals(value))
                return true;
        }
        return false;
    }

    getItemInContext(context: Context, index: Value): Value | null {
        if (index instanceof IntegerValue) {
            try {
                const idx = index.IntegerValue() - 1;
                if(idx>this.value.length) {
                    throw new IndexOutOfRangeError();
                }
                const value = this.value[idx];
                if (value != null)
                    return value;
                else
                    throw new InternalError("Item not a value!");
            } catch (e) {
                if(e instanceof PromptoError) {
                    throw e;
                } else {
                    throw new InternalError((e as Error).toString());
                }
            }
        } else
            throw new SyntaxError("No such item:" + index.toString());
    }

    equals(obj: any): boolean {
        if(obj instanceof BaseValueList) {
            if(this.value.length != obj.value.length) {
                return false;
            } else {
                for(let i=0; i<this.value.length; i++) {
                    const v1 = this.value[i] || null;
                    const v2 = obj.value[i] || null;
                    if(v1==v2) {
                        continue;
                    } else if(v1==null || v2==null) {
                        return false;
                    } else {
                        if(v1.equals) {
                            if(!v1.equals(v2)) {
                                return false;
                            }
                        } else if(v2.equals) {
                            if(!v2.equals(v1)) {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                }
                return true;
            }
        } else {
            return false;
        }
    }

    getMemberValue(context: Context, id: Identifier): Value {
        if ("count" === id.name) {
            return new IntegerValue(this.value.length);
        } else {
            return super.getMemberValue(context, id);
        }
    }

    getIterator(context: Context): Iterator<Value> {
        return new ListIterator(this.value, context);
    }

    toDialect(writer: CodeWriter): void {
        if(this.value.length>0) {
            this.value.forEach(o => {
                if(o.toDialect)
                    o.toDialect(writer);
                else
                    writer.append(o.toString());
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

}

class ListIterator implements Iterator<Value> {

    items: Value[];
    context: Context;
    index: number;

    constructor(items: Value[], context: Context) {
        this.items = items;
        this.context = context;
        this.index = -1;
    }

    hasNext() {
        return this.index < this.items.length - 1;
    }

    next() {
        return this.items[++this.index];
    }
}
