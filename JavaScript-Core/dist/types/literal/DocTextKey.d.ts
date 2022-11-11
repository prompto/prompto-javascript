import { IValue } from '../value';
import { Context, Transpiler } from "../runtime";
import DocKey from "./DocKey";
export default class DocTextKey extends DocKey {
    text: string;
    constructor(text: string);
    toString(): string;
    stringValue(): string;
    check(context: Context): void;
    interpret(context: Context): IValue;
    transpile(transpiler: Transpiler): void;
}
