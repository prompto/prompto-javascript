import JavaScriptLiteral from "./JavaScriptLiteral"
import { TextType } from "../type/index"

export default class JavaScriptTextLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return TextType.instance;
    }
}
