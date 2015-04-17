var type = require("../type/index.js");
var Value = require("../value/Value").Value;
var InternalError = require("../error/InternalError").InternalError;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var AnyNativeCategoryDeclaration = require("../declaration/AnyNativeCategoryDeclaration").AnyNativeCategoryDeclaration;

function JavaScriptType(name) {
	type.CategoryType.call(this, name);
	return this;
};

JavaScriptType.prototype = Object.create(type.CategoryType.prototype);
JavaScriptType.prototype.constructor = JavaScriptType;


JavaScriptType.scriptToTypeMap = {
	'string' : type.TextType.instance,
	'boolean' : type.BooleanType.instance,
	'object' : type.AnyType.instance
};

// borrowed from http://www.2ality.com/2011/11/improving-typeof.html
function getTypeName(value) {
    if (value === null) {
        return "null";
    }
    var t = typeof(value);
    switch(t) {
        case "function":
        case "object":
            if (value.constructor) {
                if (value.constructor.name) {
                    return value.constructor.name;
                } else {
                    // Internet Explorer
                    // Anonymous functions are stringified as follows: 'function () {}'
                    // => the regex below does not match
                    var match = value.constructor.toString().match(/^function (.+)\(.*$/);
                    if (match) {
                        return match[1];
                    }
                }
            }
            // fallback, for nameless constructors etc.
            return Object.prototype.toString.call(value).match(/^\[object (.+)\]$/)[1];
        default:
            return t;
    }
}

JavaScriptType.prototype.convertJavaScriptValueToPrestoValue = function(value, returnType) {
	if(value instanceof Value) {
		return value;
	}
    var typeName = getTypeName(value);
    var prestoType = JavaScriptType.scriptToTypeMap[typeName] || null;
	if (prestoType != null) {
		return prestoType.convertJavaScriptValueToPrestoValue(value);
	} else if(typeName=='number') {
        if (value == (value | 0)) {
            return type.IntegerType.instance.convertJavaScriptValueToPrestoValue(value);
        } else {
            return type.DecimalType.instance.convertJavaScriptValueToPrestoValue(value);
        }
    } else if(returnType==type.AnyType.instance) {
        return new NativeInstance(AnyNativeCategoryDeclaration.instance, value);
	} else {
		throw new InternalError("Unable to convert:" + typeof(value));
	}
};

exports.JavaScriptType = JavaScriptType;