import Value from './Value.js'
import { CssType } from '../type/index.js'

export default class CssValue extends Value {

    constructor(expression) {
        super(CssType.instance);
        this.expression = expression;
    }
}

