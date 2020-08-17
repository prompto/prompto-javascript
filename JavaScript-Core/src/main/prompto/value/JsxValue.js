
export default class JsxValue extends Value {

    constructor(expression) {
        super(JsxType.instance);
        this.expression = expression;
    }
}

