import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default interface IJsxExpression {

    check(context: Context): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;

    toDialect(writer: CodeWriter): void;

}
