import {INamed} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IExpression} from "../expression";
import {Dialect} from "../parser";
import {CodeWriter} from "../utils";

export default interface IParameter extends INamed {

    defaultExpression?: IExpression;

    register(context: Context): void;
    check(context: Context): IType;
    checkValue(context: Context, value: IExpression): unknown;
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
