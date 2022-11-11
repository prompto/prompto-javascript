import Literal from "./Literal";
import { IType } from '../type';
import { IValue, NullValue } from '../value';
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class NullLiteral extends Literal<NullValue> {
    static instance: NullLiteral;
    private constructor();
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;
}
