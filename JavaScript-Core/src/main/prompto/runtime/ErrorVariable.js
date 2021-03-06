import Variable from './Variable.js'
import { Identifier } from '../grammar/index.js'
import { EnumeratedCategoryType } from '../type/index.js'

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

