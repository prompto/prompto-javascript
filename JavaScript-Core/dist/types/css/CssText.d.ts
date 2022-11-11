import ICssValue from "./ICssValue";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class CssText implements ICssValue {
    text: string;
    constructor(text: string);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
