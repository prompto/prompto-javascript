import JavaScriptLiteral from './JavaScriptLiteral.js'
import { BooleanType } from '../type/index.js'

export default class JavaScriptBooleanLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return BooleanType.instance;
    }
}
