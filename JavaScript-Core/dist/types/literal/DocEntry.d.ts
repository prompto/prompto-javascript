import { CodeWriter } from "../utils";
import { IExpression } from "../expression";
import { Context, Transpiler } from '../runtime';
import DocKey from "./DocKey";
export default class DocEntry {
    key: DocKey | null;
    value: IExpression;
    constructor(key: DocKey | null, value: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
