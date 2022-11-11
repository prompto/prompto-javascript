import Literal from './Literal';
import { IType } from '../type';
import { IntegerValue } from '../value';
import { Context, Transpiler } from "../runtime";
export default class HexaLiteral extends Literal<IntegerValue> {
    static parseHexa(text: string): IntegerValue;
    constructor(text: string);
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
