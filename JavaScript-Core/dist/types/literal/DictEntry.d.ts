import DictKey from "./DictKey";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class DictEntry {
    key: DictKey;
    value: IExpression;
    constructor(key: DictKey, value: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
