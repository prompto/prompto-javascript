import NativeType from './NativeType';
import IType from "./IType";
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { IExpression } from "../expression";
import { TypeFamily } from "../store";
export default abstract class IterableType extends NativeType {
    itemType: IType;
    constructor(id: Identifier, family: TypeFamily, itemType: IType);
    checkExists(context: Context): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void;
    abstract withItemType(itemType: IType): IType;
}
