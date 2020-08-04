var type = require("../type/index.js");
var Value = require("../value/Value").Value;
var DocumentValue = require("../value/DocumentValue").DocumentValue;
var NullValue = require("../value/NullValue").NullValue;
var ListValue = require("../value/ListValue").ListValue;
var IteratorValue = require("../value/IteratorValue").IteratorValue;
var Identifier = require("../grammar/Identifier").Identifier;
var getTypeName = require("./JavaScriptUtils").getTypeName;
var InternalError = require("../error/InternalError").InternalError;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var AnyNativeCategoryDeclaration = require("../declaration/AnyNativeCategoryDeclaration").AnyNativeCategoryDeclaration;
var intrinsic = require("../intrinsic");

class JavaScriptType extends type.CategoryType {
  
    constructor(name) {
        super(name);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        return this.doConvertJavaScriptValueToPromptoValue(context, value, this.name, returnType);
    }

    doConvertJavaScriptValueToPromptoValue(context, value, klass, returnType) {
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
    }

    convertCategory(context, value, klass, returnType) {
        var decl = context.getNativeBinding(klass);
        if(decl!=null)
            return new NativeInstance(context, decl, value);
        else
            return null;
    }

    convertIterator(context, value, klass, returnType) {
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
    }

    convertDict(context, value, klass, returnType) {
        return null; // TODO
    }

    convertSet(context, value, klass, returnType) {
        return null; // TODO
    }

    convertList(context, value, klass, returnType) {
        var maybeList = returnType instanceof type.ListType || returnType instanceof type.AnyType || (returnType && returnType.toString()==="Any");
        if(maybeList && (klass==="Array" || klass==="List")) {
            var itemType = returnType instanceof type.ListType ? returnType.itemType : type.AnyType.instance;
            var items = value.map(function(item) {
                klass = getTypeName(item);
                return this.doConvertJavaScriptValueToPromptoValue(context, item, klass, itemType);
            }, this);
            return new ListValue(itemType, items);
        } else
            return null;
    }

    convertDocument(context, value, klass, returnType) {
        var maybeDoc = returnType instanceof type.DocumentType || returnType instanceof type.AnyType || (returnType && returnType.toString()==="Any");
        if(maybeDoc && (klass==="object" || klass==="Object" || klass==="Document")) {
            var doc = new DocumentValue();
            Object.getOwnPropertyNames(value).forEach(function(name) {
                var item = value[name];
                klass = getTypeName(item);
                item = this.doConvertJavaScriptValueToPromptoValue(context, item, klass, type.AnyType.instance);
                doc.setMember(context, new Identifier(name), item);
            }, this);
            return doc;
        } else
            return null;
    }

    convertNative(context, value, klass, returnType) {
        var promptoType = JavaScriptType.scriptToTypeMap[klass] || null;
        if (promptoType != null) {
            return promptoType.convertJavaScriptValueToPromptoValue(context, value, returnType);
        } else if(klass=='number') {
            if (Number.isInteger(value)) {
                return type.IntegerType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
            } else {
                return type.DecimalType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
            }
        } else
            return null;
    }

    convertValue(value) {
        if(value instanceof Value)
            return value;
        else
            return null;
    }
}


JavaScriptType.scriptToTypeMap = {
    'string': type.TextType.instance,
    'boolean': type.BooleanType.instance,
    'Date' : type.DateTimeType.instance,
    'object': type.AnyType.instance
};

// workaround webpack name mangling
JavaScriptType.scriptToTypeMap[intrinsic.LocalDate.name] = type.DateType.instance;
JavaScriptType.scriptToTypeMap[intrinsic.LocalTime.name] = type.TimeType.instance;
JavaScriptType.scriptToTypeMap[intrinsic.DateTime.name] = type.DateTimeType.instance;
JavaScriptType.scriptToTypeMap[intrinsic.Period.name] = type.PeriodType.instance;
JavaScriptType.scriptToTypeMap[intrinsic.UUID.name] = type.UUIDType.instance;
JavaScriptType.scriptToTypeMap[intrinsic.Version.name] = type.VersionType.instance;

exports.JavaScriptType = JavaScriptType;