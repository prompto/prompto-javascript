import IntegerLiteral from "./IntegerLiteral"

export default class MaxIntegerLiteral extends IntegerLiteral {

    constructor() {
        super("MAX_INTEGER", 0x20000000000000);
    }

    transpile(transpiler) {
        transpiler.append("0x20000000000000");
    }
}