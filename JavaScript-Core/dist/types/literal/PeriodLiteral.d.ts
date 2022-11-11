import Literal from './Literal';
import { IType } from '../type';
import { PeriodValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class PeriodLiteral extends Literal<PeriodValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
