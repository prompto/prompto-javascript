import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default interface CssValue {
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
