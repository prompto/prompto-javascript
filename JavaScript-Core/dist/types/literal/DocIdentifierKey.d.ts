import { TextValue } from '../value';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import DocKey from "./DocKey";
export default class DocIdentifierKey extends DocKey {
    id: Identifier;
    constructor(id: Identifier);
    toString(): string;
    stringValue(): string;
    check(context: Context): void;
    interpret(context: Context): TextValue;
    transpile(transpiler: Transpiler): void;
}
