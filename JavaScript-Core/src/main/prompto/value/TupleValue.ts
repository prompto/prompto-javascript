import BaseValueList from './BaseValueList'
import { SetValue } from '../value'
import { TupleType } from '../type'
import { SyntaxError } from '../error'
import {CodeWriter} from "../utils";
import IValue from "./IValue";
import {Context} from "../runtime";

export default class TupleValue extends BaseValueList<TupleValue> {

    constructor(mutable: boolean, items?: IValue[], item?: IValue) {
        super(TupleType.instance, mutable, items, item);
    }

    toString() {
        return "(" + this.items.join(", ") + ")";
    }

    Add(context: Context, value: IValue) {
        if (value instanceof BaseValueList) {
            const items = this.items.concat(value.items);
            return new TupleValue(false, items);
        } else if(value instanceof SetValue) {
            let items = Array.from(value.items.values());
            items = this.items.concat(items);
            return new TupleValue(false, items);
        } else {
            throw new SyntaxError("Illegal: Tuple + " + typeof(value));
        }
    }

    filter(filter: (value: IValue) => boolean): TupleValue {
        const items = this.items.filter(filter);
        return new TupleValue(false, items);
    }

    newInstance(items: IValue[]): TupleValue {
        return new TupleValue(false, items);
    }

}
