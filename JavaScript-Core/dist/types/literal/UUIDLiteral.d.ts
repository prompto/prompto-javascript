import Literal from './Literal';
import { IType } from '../type';
import { UUIDValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class UUIDLiteral extends Literal<UUIDValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
