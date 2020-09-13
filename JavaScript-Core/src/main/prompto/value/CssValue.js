import Value from "./Value"
import { CssType } from "../type/index"

export default class CssValue extends Value {

    constructor(expression) {
        super(CssType.instance);
        this.expression = expression;
    }
}

