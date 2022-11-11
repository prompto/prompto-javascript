import ICssValue from "./ICssValue";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class CssField {
    name: string;
    values: ICssValue[];
    constructor(name: string, values: ICssValue[]);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    valuesToString(): string;
}
