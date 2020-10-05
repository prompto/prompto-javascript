import JavaScriptLiteral from './JavaScriptLiteral.js'
import { DecimalType } from '../type/index.js'

export default class JavaScriptDecimalLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return DecimalType.instance;
    }

    toString() {
        return this.value.toString();
    }
}