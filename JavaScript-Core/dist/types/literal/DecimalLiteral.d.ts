import Literal from './Literal';
import { IType } from '../type';
import { DecimalValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class DecimalLiteral extends Literal<DecimalValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
