import Value from '../../../main/prompto/value/Value.ts'
import { JsxType } from '../type'

export default class JsxValue extends Value {

    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
    }
}

