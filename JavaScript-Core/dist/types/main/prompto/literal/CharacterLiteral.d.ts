import Literal from './Literal';
import { IType } from '../type';
import { CharacterValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class CharacterLiteral extends Literal<CharacterValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
