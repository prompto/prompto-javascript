import JavaScriptLiteral from "./JavaScriptLiteral"
import { IntegerType } from "../type/index"

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
