import BaseValue from './BaseValue'
import {IValue, IntegerValue} from '../value'
import { SyntaxError, IndexOutOfRangeError, InternalError } from '../error'
import {IType, RangeType} from '../type'
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {IIterable, IIterator} from "../intrinsic";

export interface Limits<T extends IValue> {
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
        if("count" == id.name)
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

    abstract newInstance(first: T, last: T): RangeValue<T>;
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

    slice(fi: IntegerValue | null, li: IntegerValue | null): RangeValue<T> {
        const _fi = fi ? fi.IntegerValue() : 1;
        const _li = li ? li.IntegerValue() : -1;
        return this.newInstance(this.getItem(_fi)!, this.getItem(_li)!);

    }


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

    getIterator(): IIterator<T> {
        return new RangeIterator(this);
    }

}

class RangeIterator<T extends IValue> {

    range: RangeValue<T>;
    size: number;
    index: number;

    constructor(range: RangeValue<T>) {
        this.range = range;
        this.size = range.size();
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.size;
    }

    next(): T {
        return this.range.getItem(++this.index) as T;
    }
}

