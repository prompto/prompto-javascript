import { TextValue, IntegerValue, DecimalValue, NullValue } from '../value/index.js'
import { MissingType, AnyType, NativeType } from '../type/index.js'
import { SyntaxError } from '../error/index.js'

export function convertFromJavaScript(value) {
    if(value==null) {
        return NullValue.instance;
    } else if(typeof(value)=='string') {
        return new TextValue(value);
    } else if(typeof(value)=='number') {
        if(Number.isInteger(value))
            return new IntegerValue(value);
        else
            return new DecimalValue(value);
    } else {
        throw "Not implemented yet in convertFromJavaScript:" + typeof(value);
    }
}


export function inferExpressionsType(context, expressions) {
    if (expressions.length == 0)
        return MissingType.instance;
    const types = expressions.map(e => e.check(context));
    return inferElementType(context, types);
}

export function inferElementType(context, types) {
    if (types.length == 0)
        return MissingType.instance;
    let lastType = null;
    for (let i = 0; i < types.length; i++) {
        const elemType = types[i];
        if (lastType == null) {
            lastType = elemType;
        } else if (!lastType.equals(elemType)) {
            if (lastType.isAssignableFrom(context, elemType)) {
                /* eslint no-empty: [ "off" ] */
                // lastType is less specific
            } else if (elemType.isAssignableFrom(context, lastType)) {
                lastType = elemType; // elemType is less specific
            } else {
                const common = inferCommonRootType(context, lastType, elemType);
                if(common!=null)
                    lastType = common;
                else
                    throw new SyntaxError("Incompatible types: " + elemType.toString() + " and " + lastType.toString());
            }
        }
    }
    return lastType;
}


function inferCommonRootType(context, type1, type2) {
    const CategoryType = require("../type/CategoryType").CategoryType;
    if ((type1 instanceof CategoryType) && (type2 instanceof CategoryType))
        return inferCommonCategoryType(context, type1, type2, true);
    else if(type1 instanceof NativeType || type2 instanceof NativeType)
        return AnyType.instance;
    else
        return null;
}


function inferCommonCategoryType(context, type1, type2, trySwap) {
    const CategoryType = require("../type/CategoryType").CategoryType;
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
            const commonType = inferCommonCategoryType(context, parentType, type2, false);
            if (commonType != null)
                return commonType;
        }
    }
    if (trySwap)
        return inferCommonCategoryType(context, type2, type1, false);
    else
        return null;
}

