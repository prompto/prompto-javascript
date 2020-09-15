import JavaScriptLiteral from './JavaScriptLiteral.js'
import { TextType } from '../type/index.js'

export default class JavaScriptTextLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return TextType.instance;
    }
}
