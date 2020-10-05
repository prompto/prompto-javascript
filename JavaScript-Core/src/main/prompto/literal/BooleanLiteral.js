import Literal from './Literal.js'
import { BooleanValue } from '../value/index.js'
import { BooleanType } from '../type/index.js'

export default class BooleanLiteral extends Literal {

    constructor(text) {
        super(text, BooleanValue.Parse(text));
    }

    check(context) {
        return BooleanType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
