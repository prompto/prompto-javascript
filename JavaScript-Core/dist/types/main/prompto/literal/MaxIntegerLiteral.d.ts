import IntegerLiteral from './IntegerLiteral';
import { Transpiler } from "../runtime";
export default class MaxIntegerLiteral extends IntegerLiteral {
    constructor();
    transpile(transpiler: Transpiler): void;
}
