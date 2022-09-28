import IntegerLiteral from './IntegerLiteral'
import {Transpiler} from "../runtime";

export default class MinIntegerLiteral extends IntegerLiteral {

    constructor() {
        super("MIN_INTEGER", -0x20000000000000);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("-0x20000000000000");
    }
}
