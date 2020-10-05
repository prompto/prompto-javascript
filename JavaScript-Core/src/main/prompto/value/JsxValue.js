import Value from './Value.js'
import { JsxType } from '../type/index.js'

export default class JsxValue extends Value {

    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
    }
}

