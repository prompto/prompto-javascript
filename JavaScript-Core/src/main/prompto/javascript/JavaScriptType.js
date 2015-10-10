var type = require("../type/index.js");
var Value = require("../value/Value").Value;
var ListValue = require("../value/ListValue").ListValue;
var getTypeName = require("./JavaScriptUtils").getTypeName;
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


JavaScriptType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	if(value instanceof Value) {
		return value;
	}
    var typeName = getTypeName(value);
    var promptoType = JavaScriptType.scriptToTypeMap[typeName] || null;
	if (promptoType != null) {
		return promptoType.convertJavaScriptValueToPromptoValue(context, value, returnType);
	} else if(typeName=='number') {
        if (value == (value | 0)) {
            return type.IntegerType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
        } else {
            return type.DecimalType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }
    if(typeName==="Array" && returnType instanceof type.ListType) {
        var self = this;
        var itemType = returnType.itemType;
        var items = value.map(function(item) {
            return self.convertJavaScriptValueToPromptoValue(context, item, itemType);
        });
        return new ListValue(itemType, items);
    }
    var decl = context.getNativeBinding(typeName);
    if(decl!=null) {
        return new NativeInstance(decl, value);
    } else if(returnType==type.AnyType.instance) {
        return new NativeInstance(AnyNativeCategoryDeclaration.instance, value);
	} else {
		throw new InternalError("Unable to convert:" + typeName);
	}
};

exports.JavaScriptType = JavaScriptType;