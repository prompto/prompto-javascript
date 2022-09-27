import BaseValue from './BaseValue'
import {IValue, IIterable, IIterator, IntegerValue} from '../value'
import { SyntaxError, IndexOutOfRangeError, InternalError } from '../error'
import {IType, RangeType} from '../type'
import {Identifier} from "../grammar";
import {Context} from "../runtime";

interface Limits<T extends IValue> {
    low: T;
    high: T;
}

export default abstract class RangeValue<T extends IValue> extends BaseValue<Limits<T>> implements IIterable<T> {

    constructor(itemType: IType, low: T, high: T) {
        const limits = { low: low, high: high };
        super(new RangeType(itemType), limits);
    }

    get low(): T {
        return this.value.low;
    }

    get high(): T {
        return this.value.high;
    }

    GetMemberValue(context: Context, id: Identifier): IValue {
        if("count" === id.name)
            return new IntegerValue(this.size());
        else
            return super.GetMemberValue(context, id);
    }

    toString(): string {
        return "[" + (this.low==null ? "" : this.low.toString()) + ".."
                + (this.high==null ? "" : this.high.toString()) + "]";
    }

    equals(obj: any): boolean {
        if(obj instanceof RangeValue<T>) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return this.low.equals(obj.low) && this.high.equals(obj.high);
        } else {
            return false;
        }
    }

    abstract hasItem(context: Context, lval: IValue): boolean ;
    abstract getItem(item: number): T | null ;
    abstract size(): number;

    GetItemValue(context: Context, index: IValue): IValue {
        if (index instanceof IntegerValue) {
            try {
                const value = this.getItem(index.IntegerValue());
                if (value instanceof BaseValue<any>) {
                    return value;
                } else {
                    throw new InternalError("Item not a value!");
                }
            } catch (e) {
                throw new IndexOutOfRangeError();
            }

        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    abstract slice(fi: IntegerValue | null, li: IntegerValue | null): RangeValue<T>;
    abstract filter<K>(filter: (value: T) => boolean): K;

    checkFirst(fi: IntegerValue | null, size: number): number {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > size) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li: IntegerValue | null, size: number): number {
        let value = (li == null) ? size : li.IntegerValue();
        if (value < 0) {
            value = size + 1 + value;
        }
        if (value < 1 || value > size) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    getIterator(context: Context): IIterator<T> {
        return new RangeIterator(context, this);
    }

}

class RangeIterator<T extends IValue> {

    context: Context;
    range: RangeValue<T>;
    size: number;
    index: number;

    constructor(context: Context, range: RangeValue<T>) {
        this.context = context;
        this.range = range;
        this.size = range.size();
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.size;
    }

    next(): T {
        return this.range.GetItemValue(this.context, new IntegerValue(++this.index)) as T;
    }
}

