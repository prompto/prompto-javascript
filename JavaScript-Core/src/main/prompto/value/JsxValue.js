import IValue from '../../../main/prompto/value/IValue.ts'
import { JsxType } from '../type'

export default class JsxValue extends IValue {

    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
    }
}

