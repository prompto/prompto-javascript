import CategoryType from "../type/CategoryType"
import { NativeInstance, NullValue } from "../value/index"
import { AnyNativeCategoryDeclaration } from "../declaration/index"
import { AnyType, ListType, DocumentType, IntegerType, DecimalType, BooleanType, TextType, PeriodType, 
    IteratorType, DateTimeType, DateType, TimeType, VersionType, UUIDType } from "../type/index"
import { ListValue, DocumentValue, Value, IteratorValue } from "../value/index"
import { Identifier } from "../grammar/index"
import { getTypeName } from "../utils/index"
import { InternalError } from "../error/index"
import { LocalTime, LocalDate, DateTime, Period, UUID, Version } from "../intrinsic/index"

export default class JavaScriptType extends CategoryType {
  
    constructor(name) {
        super(name);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        return this.doConvertJavaScriptValueToPromptoValue(context, value, this.name, returnType);
    }

    doConvertJavaScriptValueToPromptoValue(context, value, klass, returnType) {
        if(value==null)
            return NullValue.instance;
        let res = this.convertValue(value);
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
        else if(returnType==AnyType.instance) {
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
        const decl = context.getNativeBinding(klass);
        if(decl!=null)
            return new NativeInstance(context, decl, value);
        else
            return null;
    }

    convertIterator(context, value, klass, returnType) {
        if(returnType instanceof IteratorType && value.hasNext!==undefined && value.next!==undefined) {
            const self = this;
            const converting = {
                hasNext : function() { return value.hasNext(); },
                next : function() {
                    const item = value.next();
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
        const maybeList = returnType instanceof ListType || returnType instanceof AnyType || (returnType && returnType.toString()==="Any");
        if(maybeList && (klass==="Array" || klass==="List")) {
            const itemType = returnType instanceof ListType ? returnType.itemType : AnyType.instance;
            const items = value.map(function(item) {
                klass = getTypeName(item);
                return this.doConvertJavaScriptValueToPromptoValue(context, item, klass, itemType);
            }, this);
            return new ListValue(itemType, items);
        } else
            return null;
    }

    convertDocument(context, value, klass, returnType) {
        const maybeDoc = returnType instanceof DocumentType || returnType instanceof AnyType || (returnType && returnType.toString()==="Any");
        if(maybeDoc && (klass==="object" || klass==="Object" || klass==="Document")) {
            const doc = new DocumentValue();
            Object.getOwnPropertyNames(value).forEach(function(name) {
                let item = value[name];
                klass = getTypeName(item);
                item = this.doConvertJavaScriptValueToPromptoValue(context, item, klass, AnyType.instance);
                doc.setMember(context, new Identifier(name), item);
            }, this);
            return doc;
        } else
            return null;
    }

    convertNative(context, value, klass, returnType) {
        const promptoType = JavaScriptType.scriptToTypeMap[klass] || null;
        if (promptoType != null) {
            return promptoType.convertJavaScriptValueToPromptoValue(context, value, returnType);
        } else if(klass=='number') {
            if (Number.isInteger(value)) {
                return IntegerType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
            } else {
                return DecimalType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
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
    'string': TextType.instance,
    'boolean': BooleanType.instance,
    'Date' : DateTimeType.instance,
    'object': AnyType.instance
};

// workaround webpack name mangling
JavaScriptType.scriptToTypeMap[LocalDate.name] = DateType.instance;
JavaScriptType.scriptToTypeMap[LocalTime.name] = TimeType.instance;
JavaScriptType.scriptToTypeMap[DateTime.name] = DateTimeType.instance;
JavaScriptType.scriptToTypeMap[Period.name] = PeriodType.instance;
JavaScriptType.scriptToTypeMap[UUID.name] = UUIDType.instance;
JavaScriptType.scriptToTypeMap[Version.name] = VersionType.instance;
