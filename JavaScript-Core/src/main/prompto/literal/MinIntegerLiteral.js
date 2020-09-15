import IntegerLiteral from './IntegerLiteral.js'

export default class MinIntegerLiteral extends IntegerLiteral {

    constructor() {
        super("MIN_INTEGER", -0x20000000000000);
    }

    transpile(transpiler) {
        transpiler.append("-0x20000000000000");
    }
}