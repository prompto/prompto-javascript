import { VoidType, NullType, AnyType, CategoryType, NativeType, DecimalType } from '../type'
import IType from "./IType";
import {Context} from "../runtime";
import {Section} from "../parser";

export default class TypeMap extends Map<string, IType> {

    add(type: IType) {
        this.set(type.name, type);
    }

    inferType(context: Context, section: Section) : IType {
        switch (this.size) {
            case 0:
                return VoidType.instance;
            case 1:
                return this.values().next().value as IType;
            default:
                return this.doInferType(context, section);
        }
    }

    doInferType(context: Context, section: Section): IType {
        let inferred: IType | null = null;
        // first pass: get less specific type
        this.forEach((type, ) => {
            if(!inferred || inferred == NullType.instance) {
                inferred = type;
            } else if(inferred.isAssignableFrom(context, type)) {
                inferred = type == DecimalType.instance ? type : inferred;
            } else if(type.isAssignableFrom(context, inferred)) {
                inferred = type;
            } else {
                const common = this.inferCommonBaseType(context, inferred, type);
                if(common)
                    inferred = common;
                else
                    context.problemListener.reportIncompatibleTypes(section, type, inferred);
            }
        }, this);
        if(inferred) {
            // second pass: check compatibility
            this.forEach((type, ) => {
                if (type != inferred && !inferred?.isAssignableFrom(context, type)) {
                    context.problemListener.reportIncompatibleTypes(section, inferred!, type);
                }
            }, this);
            return inferred;
        } else
            return VoidType.instance;
    }

    inferCommonBaseType(context: Context, type1: IType, type2: IType): IType | null {
        if ((type1 instanceof CategoryType) && (type2 instanceof CategoryType))
            return this.inferCommonCategoryType(context, type1, type2, true);
        else if(type1 instanceof NativeType || type2 instanceof NativeType)
            return AnyType.instance;
        else
            return null;
    }

    inferCommonCategoryType(context: Context, type1: IType, type2: IType, trySwap: boolean): IType | null {
        const decl1 = context.getRegisteredCategoryDeclaration(type1.id);
        if (decl1) {
            if(decl1.derivedFrom) {
                for (let i = 0; i < decl1.derivedFrom.length; i++) {
                    const parentType = new CategoryType(decl1.derivedFrom[i]);
                    if (parentType.isAssignableFrom(context, type2))
                        return parentType;
                }
                // climb up the tree
                for (let i = 0; i < decl1.derivedFrom.length; i++) {
                    const parentType = new CategoryType(decl1.derivedFrom[i]);
                    const commonType = this.inferCommonCategoryType(context, parentType, type2, false);
                    if (commonType != null)
                        return commonType;
                }
            }
        }
        if (trySwap)
            return this.inferCommonCategoryType(context, type2, type1, false);
        else
            return null;
    }

}

