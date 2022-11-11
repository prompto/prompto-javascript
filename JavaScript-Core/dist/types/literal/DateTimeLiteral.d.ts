import Literal from './Literal';
import { IType } from '../type';
import { DateTimeValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class DateTimeLiteral extends Literal<DateTimeValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
