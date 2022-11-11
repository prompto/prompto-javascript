import IType from "./IType";
import { Context } from "../runtime";
import { Section } from "../parser";
export default class TypeMap extends Map<string, IType> {
    add(type: IType): void;
    inferType(context: Context, section: Section): IType;
    doInferType(context: Context, section: Section): IType;
    inferCommonBaseType(context: Context, type1: IType, type2: IType): IType | null;
    inferCommonCategoryType(context: Context, type1: IType, type2: IType, trySwap: boolean): IType | null;
}
