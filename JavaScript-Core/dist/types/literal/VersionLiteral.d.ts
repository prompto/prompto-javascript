import Literal from './Literal';
import { IType } from '../type';
import { VersionValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class VersionLiteral extends Literal<VersionValue> {
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
