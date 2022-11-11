import Literal from './Literal';
import { BooleanValue } from '../value';
import { IType } from '../type';
import { Context, Transpiler } from "../runtime";
export default class BooleanLiteral extends Literal<BooleanValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
