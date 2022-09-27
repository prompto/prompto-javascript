import JavaScriptLiteral from './JavaScriptLiteral.js'
import { IntegerType } from '../type'

export default class JavaScriptIntegerLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context: Context): IType {
        return IntegerType.instance;
    }

    toString() {
        return this.value.toString();
    }
}
