import Literal from './Literal';
import { IType } from '../type';
import { IntegerValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class IntegerLiteral extends Literal<IntegerValue> {
    constructor(text: string, value?: number);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
