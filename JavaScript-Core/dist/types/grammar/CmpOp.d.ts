import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class CmpOp {
    static GT: CmpOp;
    static GTE: CmpOp;
    static LT: CmpOp;
    static LTE: CmpOp;
    name: string;
    s: string;
    t: string;
    private constructor();
    toString(): string;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
