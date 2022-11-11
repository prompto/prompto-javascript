import NamedInstance from '../grammar/NamedInstance';
import { Identifier } from "../grammar";
import { IType } from "../type";
import { Context, Transpiler } from "./index";
export default class Variable extends NamedInstance {
    type: IType;
    constructor(id: Identifier, type: IType);
    get name(): string;
    toString(): string;
    transpile(transpiler: Transpiler): void;
    getType(context: Context): IType;
}
