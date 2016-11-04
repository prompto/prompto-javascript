var type = require("../type/index.js");
var Value = require("../value/Value").Value;
var Document = require("../value/Document").Document;
var NullValue = require("../value/NullValue").NullValue;
var ListValue = require("../value/ListValue").ListValue;
var IteratorValue = require("../value/IteratorValue").IteratorValue;
var Identifier = require("../grammar/Identifier").Identifier;
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
    'Date' : type.DateTimeType.instance,
	'object' : type.AnyType.instance
};


JavaScriptType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    return this.doConvertJavaScriptValueToPromptoValue(context, value, this.name, returnType);
}

JavaScriptType.prototype.doConvertJavaScriptValueToPromptoValue = function(context, value, klass, returnType) {
    if(value==null)
        return NullValue.instance;
    var res = this.convertValue(value);
    if(res)
        return res;
    else
        res = this.convertNative(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertDocument(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertList(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertSet(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertDict(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertIterator(context, value, klass, returnType);
    if(res)
        return res;
    else
        res = this.convertCategory(context, value, klass, returnType);
    if(res)
        return res;
    else if(returnType==type.AnyType.instance) {
        return new NativeInstance(AnyNativeCategoryDeclaration.instance, value);
	} else {
        // when running under nodeunit, process.stdout is sometimes a WriteStream rather than a Socket
        // so need to adjust accordingly to prevent TestNative.testPrinter to fail
        if(klass=='WriteStream') {
            res = this.convertCategory(context, value, "Socket", returnType);
            if(res)
                return res;
        }
		throw new InternalError("Unable to convert:" + getTypeName(value));
	}
};

JavaScriptType.prototype.convertCategory = function(context, value, klass, returnType) {
    var decl = context.getNativeBinding(klass);
    if(decl!=null)
        return new NativeInstance(decl, value);
    else
        return null;
};

JavaScriptType.prototype.convertIterator = function(context, value, klass, returnType) {
    if(returnType instanceof type.IteratorType && value.hasNext!==undefined && value.next!==undefined) {
        var self = this;
        var converting = {
            hasNext : function() { return value.hasNext(); },
            next : function() {
                var item = value.next();
                klass = getTypeName(item);
                return self.doConvertJavaScriptValueToPromptoValue(context, item, klass, returnType.itemType);
            }
        };
        return new IteratorValue(returnType.itemType, converting);
    } else
        return null; // TODO
};

JavaScriptType.prototype.convertDict = function(context, value, klass, returnType) {
    return null; // TODO
};

JavaScriptType.prototype.convertSet = function(context, value, klass, returnType) {
    return null; // TODO
};

JavaScriptType.prototype.convertList = function(context, value, klass, returnType) {
    if(klass==="Array" && returnType instanceof type.ListType) {
        var self = this;
        var itemType = returnType.itemType;
        var items = value.map(function(item) {
            klass = getTypeName(item);
            return self.doConvertJavaScriptValueToPromptoValue(context, item, klass, itemType);
        });
        return new ListValue(itemType, items);
    } else
        return null;
};

JavaScriptType.prototype.convertDocument = function(context, value, klass, returnType) {
    if(returnType instanceof type.DocumentType && klass=="Object") {
        var self = this;
        var itemType = returnType.itemType;
        var doc = new Document();
        for(var key in value) {
            var item = value[key];
            klass = getTypeName(item);
            item = self.doConvertJavaScriptValueToPromptoValue(context, item, klass, itemType);
            doc.setMember(context, new Identifier(key.toString()), item);
        }
        return doc;
    } else
        return null;
};

JavaScriptType.prototype.convertNative = function(context, value, klass, returnType) {
    var promptoType = JavaScriptType.scriptToTypeMap[klass] || null;
    if (promptoType != null) {
        return promptoType.convertJavaScriptValueToPromptoValue(context, value, returnType);
    } else if(klass=='number') {
        if (value == Math.floor(value)) {
            return type.IntegerType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
        } else {
            return type.DecimalType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    } else
        return null;
};

JavaScriptType.prototype.convertValue = function(value) {
    if(value instanceof Value)
        return value;
    else
        return null;
};

exports.JavaScriptType = JavaScriptType;