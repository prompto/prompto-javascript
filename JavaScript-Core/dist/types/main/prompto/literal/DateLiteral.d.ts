import Literal from './Literal';
import { IType } from '../type';
import { DateValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class DateLiteral extends Literal<DateValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
