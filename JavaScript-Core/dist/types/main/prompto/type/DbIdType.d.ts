import NativeType from './NativeType';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
export default class DbIdType extends NativeType {
    static instance: DbIdType;
    constructor();
    isAssignableFrom(context: Context, other: IType): boolean;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
