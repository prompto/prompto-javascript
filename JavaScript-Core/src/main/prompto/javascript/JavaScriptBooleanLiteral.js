import JavaScriptLiteral from './JavaScriptLiteral.js'
import { BooleanType } from '../type'

export default class JavaScriptBooleanLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context: Context): IType {
        return BooleanType.instance;
    }
}
