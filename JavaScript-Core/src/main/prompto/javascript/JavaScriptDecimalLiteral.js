import JavaScriptLiteral from "./JavaScriptLiteral"
import { DecimalType } from "../type/index"

export default class JavaScriptDecimalLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return DecimalType.instance;
    }

    toString() {
        return this.value.toString();
    }
}