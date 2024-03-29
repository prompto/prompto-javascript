import Value from './Value.js'
import { CssType } from '../type/index.js'
import { SyntaxError } from "../error/index.js";

export default class CssValue extends Value {

    constructor(expression) {
        super(CssType.instance);
        this.expression = expression;
    }

    toString() {
        return this.expression.toString();
    }

    Add(context, value) {
        if (value instanceof CssValue) {
            return new CssValue(this.expression.plus(value.expression));
       } else {
            throw new SyntaxError("Illegal: Css + " + typeof(value));
        }
    }

}

