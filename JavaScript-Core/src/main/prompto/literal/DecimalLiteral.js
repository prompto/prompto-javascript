import Literal from "./Literal"
import { DecimalType } from "../type/index"
import { DecimalValue } from "../value/index"

export default class DecimalLiteral extends Literal {

    constructor(text) {
        super(text, DecimalValue.Parse(text));
    }

    check(context) {
        return DecimalType.instance;
    }

    declare(transpiler) {
        // nothing to do;
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
