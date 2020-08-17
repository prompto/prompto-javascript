
export default class CssValue extends Value {

    constructor(expression) {
        super(CssType.instance);
        this.expression = expression;
    }
}

