import JavaScriptLiteral from './JavaScriptLiteral.js'
import { IntegerType } from '../type/index.js'

export default class JavaScriptIntegerLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return IntegerType.instance;
    }

    toString() {
        return this.value.toString();
    }
}
