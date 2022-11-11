import { IValue } from '../value';
import { IType } from "../type";
import DictKey from "./DictKey";
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
export default class DictIdentifierKey extends DictKey {
    id: Identifier;
    constructor(id: Identifier);
    toString(): string;
    check(context: Context): IType;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
