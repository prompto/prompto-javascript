import NamedInstance from '../grammar/NamedInstance';
import { IValue } from '../value';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import { CodeWriter, IWritable } from "../utils";
import { Dialect } from "../parser";
import { IParameter } from "./index";
export default abstract class BaseParameter extends NamedInstance implements IWritable, IParameter {
    mutable: boolean;
    defaultExpression?: IExpression;
    constructor(id: Identifier, mutable: boolean);
    setMutable(mutable: boolean): void;
    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;
    abstract register(context: Context): void;
    abstract declare(transpiler: Transpiler): void;
    abstract check(context: Context): IType;
    abstract equals(other: IParameter): boolean;
    checkValue(context: Context, expression: IExpression): IValue;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, expression: IExpression): void;
    abstract getSignature(dialect: Dialect): string;
    abstract getProto(context: Context): string;
    abstract getTranspiledName(context: Context): string;
}
