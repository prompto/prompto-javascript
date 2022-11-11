import NativeType from './NativeType';
import { Context } from "../runtime";
import IType from "./IType";
export default class VoidType extends NativeType {
    static instance: VoidType;
    constructor();
    isAssignableFrom(context: Context, other: IType): boolean;
}
