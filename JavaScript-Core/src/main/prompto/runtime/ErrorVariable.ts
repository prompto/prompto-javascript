import Variable from './Variable'
import { Identifier } from '../grammar'
import { EnumeratedCategoryType } from '../type'
import {Context} from "./Context";

export default class ErrorVariable extends Variable {

    constructor(id: Identifier) {
        super(id, new EnumeratedCategoryType(new Identifier("Error")));
    }

    toString() {
        return this.name;
    }

    getType(context: Context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }
}

