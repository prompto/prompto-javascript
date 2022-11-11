import { IValue } from '../value';
import DictKey from "./DictKey";
import { Context, Transpiler } from "../runtime";
export default class DictTextKey extends DictKey {
    text: string;
    constructor(text: string);
    toString(): string;
    stringValue(): string;
    check(context: Context): void;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
