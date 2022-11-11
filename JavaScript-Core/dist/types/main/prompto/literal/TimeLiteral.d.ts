import Literal from './Literal';
import { IType } from '../type';
import { TimeValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class TimeLiteral extends Literal<TimeValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
