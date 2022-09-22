import JavaScriptLiteral from './JavaScriptLiteral.js'
import { DecimalType } from '../type'

export default class JavaScriptDecimalLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context: Context): Type {
        return DecimalType.instance;
    }

    toString() {
        return this.value.toString();
    }
}
