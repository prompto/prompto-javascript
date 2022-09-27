import Variable from './Variable.ts'
import { Identifier } from '../grammar'
import { EnumeratedCategoryType } from '../type'

export default class ErrorVariable extends Variable {

    constructor(id) {
        super(id, new EnumeratedCategoryType(new Identifier("Error")));
    }

    toString() {
        return this.name;
    }

    getType(context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }
}

