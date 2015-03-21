var type = require("../type/index.js");
var Value = require("../value/Value").Value;
var InternalError = require("../error/InternalError").InternalError;

function JavaScriptType(name) {
	type.CategoryType.call(this, name);
	return this;
};

JavaScriptType.prototype = Object.create(type.CategoryType.prototype);
JavaScriptType.prototype.constructor = JavaScriptType;


JavaScriptType.scriptToTypeMap = {
	'string' : type.TextType.instance,
	'boolean' : type.BooleanType.instance,
	'object' : type.AnyType.instance,
};

JavaScriptType.prototype.convertJavaScriptValueToPrestoValue = function(value) {
	if(value instanceof Value) {
		return value;
	}
	var prestoType = JavaScriptType.scriptToTypeMap[typeof(value)] || null;
	if (prestoType != null) {
		return prestoType.convertJavaScriptValueToPrestoValue(value);
	} else if(typeof(value)=='number') {
		if(value==(value | 0)) {
			return type.IntegerType.instance.convertJavaScriptValueToPrestoValue(value);
		} else {
			return type.DecimalType.instance.convertJavaScriptValueToPrestoValue(value);
		}
	} else {
		throw new InternalError("Unable to convert:" + typeof(value));
	}
};

exports.JavaScriptType = JavaScriptType;