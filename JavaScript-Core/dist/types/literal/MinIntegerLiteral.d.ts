import IntegerLiteral from './IntegerLiteral';
import { Transpiler } from "../runtime";
export default class MinIntegerLiteral extends IntegerLiteral {
    constructor();
    transpile(transpiler: Transpiler): void;
}
