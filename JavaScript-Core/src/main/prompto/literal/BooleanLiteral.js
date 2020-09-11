import Literal from "./Literal"
import { BooleanValue } from "../value/index"
import { BooleanType } from "../type/index"

export default class BooleanLiteral extends Literal {

    constructor(text) {
        super(text, BooleanValue.Parse(text));
    }

    check(context) {
        return BooleanType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
