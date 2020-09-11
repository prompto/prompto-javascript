import Value from "./Value"
import { JsxType } from "../type/index"

export default class JsxValue extends Value {

    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
    }
}

