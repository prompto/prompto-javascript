import Value from './Value.ts'
import { IntegerValue } from '../value'
import { SyntaxError, IndexOutOfRangeError, InternalError } from '../error'
import { RangeType } from '../type'

export default class RangeValue extends Value {
   
    constructor(itemType, left, right) {
        super(new RangeType(itemType));
        const cmp = left.cmp(right);
        if(cmp<0) {
            this.low = left;
            this.high = right;
        } else {
            this.low = right;
            this.high = left;
        }
    }

    getMemberValue(context, id) {
        if("count" === id.name)
            return new IntegerValue(this.size());
        else
            return super.getMemberValue(context, id);
    }

    toString() {
        return "[" + (this.low==null?"":this.low.toString()) + ".."
                + (this.high==null?"":this.high.toString()) + "]";
    }

    equals(obj) {
        if(obj instanceof RangeValue) {
            return this.low.equals(obj.low) && this.high.equals(obj.high);
        } else {
            return false;
        }
    }

    hasItem(context, lval) {
        const a = lval.cmp(this.low);
        const b = this.high.cmp(lval);
        return a>=0 && b>=0;
    }

    getItemInContext(context, index) {
        if (index instanceof IntegerValue) {
            try {
                const value = this.getItem(index.IntegerValue());
                if (value instanceof Value) {
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

    slice(fi, li) {
        const size = this.size();
        const first = this.checkFirst(fi, size);
        const last = this.checkLast(li, size);
        return this.newInstance(this.getItem(first),this.getItem(last));
    }

    checkFirst(fi, size) {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > size) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li, size) {
        let value = (li == null) ? size : li.IntegerValue();
        if (value < 0) {
            value = size + 1 + li.IntegerValue();
        }
        if (value < 1 || value > size) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    getIterator(context) {
        return new RangeIterator(context, this);
    }
}

class RangeIterator {

    constructor(context, range) {
        this.context = context;
        this.range = range;
        this.index = 0;
    }

    hasNext() {
        return this.index<this.range.size();
    }

    next() {
        return this.range.getItemInContext(this.context, new IntegerValue(++this.index));
    }
}

