import JavaScriptLiteral from "./JavaScriptLiteral"
import { BooleanType } from "../type/index"

export default class JavaScriptBooleanLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return BooleanType.instance;
    }
}
