import { VoidType, NullType } from './index.js'
import {AnyType, CategoryType, NativeType} from "./index";

export default class TypeMap {

    add(type) {
        this[type.name] = type;
    }

    inferType(context, section) {
        const keys = Object.keys(this);
        switch (keys.length) {
            case 0:
                return VoidType.instance;
            case 1:
                return this[keys[0]];
            default:
                return this.doInferType(context, keys, section);
        }
    }

    doInferType(context, keys, section) {
        let inferred = null;
        // first pass: get less specific type
        for(let i=0;i<keys.length;i++) {
            const current = this[keys[i]];
            if(current == NullType.instance) {
                continue;
            } else if(inferred==null) {
                inferred = current;
            } else if(inferred.isAssignableFrom(context, current)) {
                continue;
            } else if(current.isAssignableFrom(context, inferred)) {
                inferred = current;
            } else {
                const common = this.inferCommonBaseType(context, inferred, current);
                if(common!=null)
                    inferred = common;
                else
                    context.problemListener.reportIncompatibleTypes(section, current, inferred);
            }
        }
        if(inferred==null)
            return NullType.instance;
        // second pass: check compatibility
        keys.forEach(function(k) {
            const type = this[k];
            if(type!=inferred && !inferred.isAssignableFrom(context, type)) {
                context.problemListener.reportIncompatibleTypes(section, inferred, type);
            }
        }, this);
        return inferred;
    }

    inferCommonBaseType(context, type1, type2) {
        if ((type1 instanceof CategoryType) && (type2 instanceof CategoryType))
            return this.inferCommonCategoryType(context, type1, type2, true);
        else if(type1 instanceof NativeType || type2 instanceof NativeType)
            return AnyType.instance;
        else
            return null;
    }

    inferCommonCategoryType(context, type1, type2, trySwap) {
        const decl1 = context.getRegisteredDeclaration(type1.id.name);
        if (decl1.derivedFrom != null) {
            for (let i = 0; i < decl1.derivedFrom.length; i++) {
                var parentType = new CategoryType(decl1.derivedFrom[i]);
                if (parentType.isAssignableFrom(context, type2))
                    return parentType;
            }
            // climb up the tree
            for (let i = 0; i < decl1.derivedFrom.length; i++) {
                parentType = new CategoryType(decl1.derivedFrom[i]);
                const commonType = this.inferCommonCategoryType(context, parentType, type2, false);
                if (commonType != null)
                    return commonType;
            }
        }
        if (trySwap)
            return this.inferCommonCategoryType(context, type2, type1, false);
        else
            return null;
    }

}

