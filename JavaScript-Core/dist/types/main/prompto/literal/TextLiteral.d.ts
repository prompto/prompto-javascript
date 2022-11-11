import Literal from './Literal';
import { IType } from '../type';
import { TextValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class TextLiteral extends Literal<TextValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
