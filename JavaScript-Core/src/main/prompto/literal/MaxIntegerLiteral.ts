import IntegerLiteral from './IntegerLiteral'
import {Transpiler} from "../runtime";

export default class MaxIntegerLiteral extends IntegerLiteral {

    constructor() {
        super("MAX_INTEGER", 0x20000000000000);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("0x20000000000000");
    }
}
