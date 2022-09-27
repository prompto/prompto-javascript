import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class CmpOp {

    static GT = new CmpOp("GT", ">", "gt");
    static GTE = new CmpOp("GTE", ">=", "gte");
    static LT = new CmpOp("LT", "<", "lt");
    static LTE = new CmpOp("LTE", "<=", "lte");

    name: string;
    s: string;
    t: string;

    private constructor(name: string, s: string, t: string) {
        this.name = name;
        this.s = s;
        this.t = t;
    }

    toString() {
        return this.s;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.toString());
    }

    transpile(transpiler: Transpiler) {
        transpiler.append(this.t);
    }
}
