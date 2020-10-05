import BaseValueList from './BaseValueList.js'
import { BooleanValue, SetValue } from './index.js'
import { TupleType } from '../type/index.js'
import { InternalError, SyntaxError } from '../error/index.js'

export default class TupleValue extends BaseValueList {

    constructor(items, item, mutable) {
        super(TupleType.instance, items, item, mutable);
    }

    toString() {
        return "(" + this.items.join(", ") + ")";
    }

    toDialect(writer) {
        writer.append('(');
        super.toDialect(writer);
        writer.append(')');
    }

    Add(context, value) {
        if (value instanceof BaseValueList) {
            const items = this.items.concat(value.items);
            return new TupleValue(items);
        } else if(value instanceof SetValue) {
            let items = Array.from(value.items.set.values());
            items = this.items.concat(items);
            return new TupleValue(items);
        } else {
            throw new SyntaxError("Illegal: Tuple + " + typeof(value));
        }
    }

    filter(context, itemId, filter) {
        const result = new TupleValue();
        const iter = this.getIterator(context);
        while(iter.hasNext()) {
            const o = iter.next();
            context.setValue(itemId, o);
            const test = filter.interpret(context);
            if(!(test instanceof BooleanValue)) {
                throw new InternalError("Illegal test result: " + test);
            }
            if(test.value) {
                result.add(o);
            }
        }
        return result;
    }
}
