var MissingType = require("../type/MissingType").MissingType;
var NativeType = require("../type/NativeType").NativeType;
var AnyType = require("../type/AnyType").AnyType;
var NullValue = require("../value/NullValue").NullValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var TextValue = require("../value/TextValue").TextValue;

var convertFromJavaScript = function(value) {
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
};


var inferExpressionsType = function(context, expressions) {
    if (expressions.length == 0)
        return MissingType.instance;
    var types = expressions.map(function(e) { return e.check(context); });
    return inferElementType(context, types);
}

var inferElementType = function(context, types) {
    if (types.length == 0)
        return MissingType.instance;
    var lastType = null;
    for (var i = 0; i < types.length; i++) {
        var elemType = types[i];
        if (lastType == null) {
            lastType = elemType;
        } else if (!lastType.equals(elemType)) {
            if (lastType.isAssignableFrom(context, elemType)) {
                /* eslint no-empty: [ "off" ] */
                // lastType is less specific
            } else if (elemType.isAssignableFrom(context, lastType)) {
                lastType = elemType; // elemType is less specific
            } else {
                var common = inferCommonRootType(context, lastType, elemType);
                if(common!=null)
                    lastType = common;
                else
                    throw new SyntaxError("Incompatible types: " + elemType.toString() + " and " + lastType.toString());
            }
        }
    }
    return lastType;
};


function inferCommonRootType(context, type1, type2) {
    var CategoryType = require("../type/CategoryType").CategoryType;
    if ((type1 instanceof CategoryType) && (type2 instanceof CategoryType))
        return inferCommonCategoryType(context, type1, type2, true);
    else if(type1 instanceof NativeType || type2 instanceof NativeType)
        return AnyType.instance;
    else
        return null;
}


function inferCommonCategoryType(context, type1, type2, trySwap) {
    var CategoryType = require("../type/CategoryType").CategoryType;
    var decl1 = context.getRegisteredDeclaration(type1.id.name);
    if (decl1.derivedFrom != null) {
        for (var i = 0; i < decl1.derivedFrom.length; i++) {
            var parentType = new CategoryType(decl1.derivedFrom[i]);
            if (parentType.isAssignableFrom(context, type2))
                return parentType;
        }
        // climb up the tree
        for (i = 0; i < decl1.derivedFrom.length; i++) {
            parentType = new CategoryType(decl1.derivedFrom[i]);
            var commonType = inferCommonCategoryType(context, parentType, type2, false)
            if (commonType != null)
                return commonType;
        }
    }
    if (trySwap)
        return inferCommonCategoryType(context, type2, type1, false);
    else
        return null;
}


exports.convertFromJavaScript = convertFromJavaScript;
exports.inferExpressionsType = inferExpressionsType;
exports.inferElementType = inferElementType;