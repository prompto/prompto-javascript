import NativeType from './NativeType';
import { Context } from "../runtime";
import IType from "./IType";
export default class MissingType extends NativeType {
    static instance: MissingType;
    constructor();
    isAssignableFrom(context: Context, other: IType): boolean;
}
