import BaseType from './BaseType';
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
export default class NullType extends BaseType {
    static instance: NullType;
    constructor();
    checkExists(context: Context): void;
    isAssignableFrom(context: Context, other: IType): boolean;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    equals(other: any): boolean;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
