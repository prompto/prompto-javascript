import Literal from './Literal.js'
import { DecimalType } from '../type/index.js'
import { DecimalValue } from '../value/index.js'

export default class DecimalLiteral extends Literal {

    constructor(text) {
        super(text, DecimalValue.Parse(text));
    }

    check(context) {
        return DecimalType.instance;
    }

    declare(transpiler) {
        // nothing to do;
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
