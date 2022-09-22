import JavaScriptLiteral from './JavaScriptLiteral.js'
import { TextType } from '../type'

export default class JavaScriptTextLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context: Context): Type {
        return TextType.instance;
    }
}
