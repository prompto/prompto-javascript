import { INamed } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { IType } from "../type";
import { IExpression } from "../expression";
import { Dialect } from "../parser";
import { CodeWriter } from "../utils";
import { IValue } from "../value";
export default interface IParameter extends INamed {
    mutable: boolean;
    defaultExpression?: IExpression;
    register(context: Context): void;
    check(context: Context): IType;
    checkValue(context: Context, value: IExpression): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, expression: IExpression): void;
    equals(incoming: IParameter): boolean;
    getSignature(dialect: Dialect): string;
    getProto(context: Context): string;
    getTranspiledName(context: Context): string;
    toDialect(writer: CodeWriter): void;
    setMutable(mutable: boolean): void;
}
