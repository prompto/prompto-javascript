import {Value} from "../value";
import {Context, Transpilable, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {Type} from "../type";

export default interface Constraint extends Transpilable {
    checkValue(context: Context, value: Value): void;
    toDialect(writer: CodeWriter): void;
    declareChecker(transpiler: Transpiler, name: string, type: Type): void;
}
