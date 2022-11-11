/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
import CategoryType from '../type/CategoryType'
import { NativeInstance, NullValue} from '../value'
import { AnyNativeCategoryDeclaration } from '../declaration'
import {
    AnyType, ListType, DocumentType, IntegerType, DecimalType, BooleanType, TextType, PeriodType,
    IteratorType, DateTimeType, DateType, TimeType, VersionType, UUIDType, IType, IterableType
} from '../type'
import { ListValue, DocumentValue, IValue, IteratorValue } from '../value'
import { Identifier } from '../grammar'
import { InternalError } from '../error'
import {LocalTime, LocalDate, DateTime, Period, UUID, Version, IIterator, getTypeName} from '../intrinsic'
import {Context} from "../runtime";
import BaseValue from "../value/BaseValue";

export default class JavaScriptClassType extends CategoryType {

    static valueToTypeMap: Map<string, IType> = new Map<string, IType>();

    static init() {
        JavaScriptClassType.initializeValueToTypeMap();
    }

    static initializeValueToTypeMap() {
        if(JavaScriptClassType.valueToTypeMap.size == 0) {
            const map = JavaScriptClassType.valueToTypeMap;
            map.set('string', TextType.instance);
            map.set('boolean', BooleanType.instance);
            map.set('Date', DateTimeType.instance);
            map.set('object', AnyType.instance);
            // workaround webpack name mangling
            map.set(LocalDate.name, DateType.instance);
            map.set(LocalTime.name, TimeType.instance);
            map.set(DateTime.name, DateTimeType.instance);
            map.set(Period.name, PeriodType.instance);
            map.set(UUID.name, UUIDType.instance);
            map.set(Version.name, VersionType.instance);
        }
    }

    id: Identifier;

    constructor(id: Identifier) {
        super(id);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType): IValue {
        return JavaScriptClassType.doConvertJavaScriptValueToPromptoValue(context, value, this.id.name, returnType);
    }

    static doConvertJavaScriptValueToPromptoValue(context: Context, value: any, klass: string, returnType: IType): IValue {
        if(value==null)
            return NullValue.instance;
        let res = JavaScriptClassType.convertValue(value);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertNative(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertDocument(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertList(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertSet(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertDict(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertIterator(context, value, klass, returnType);
        if(res)
            return res;
        else
            res = JavaScriptClassType.convertCategory(context, value, klass, returnType);
        if(res)
            return res;
        else if(returnType == AnyType.instance) {
            return new NativeInstance(context, AnyNativeCategoryDeclaration.instance, value);
        } else {
            // when running under nodeunit, process.stdout is sometimes a WriteStream rather than a Socket
            // so need to adjust accordingly to prevent TestNative.testPrinter to fail
            if(klass == 'WriteStream') {
                res = JavaScriptClassType.convertCategory(context, value, "Socket", returnType);
                if(res)
                    return res;
            }
            throw new InternalError("Unable to convert:" + getTypeName(value)!);
        }
    }

    static convertCategory(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        const decl = context.getNativeBinding(klass);
        if(decl!=null)
            return new NativeInstance(context, decl, value);
        else
            return null;
    }

    static convertIterator(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        if(returnType instanceof IteratorType) {
            if(value["hasNext" as keyof typeof value] && value["next" as keyof typeof value] && returnType instanceof IterableType ) {
                const converting = {
                    hasNext: function () {
                        return (value as IIterator<any>).hasNext();
                    },
                    next: function () {
                        const item = (value as IIterator<any>).next();
                        klass = getTypeName(item)!;
                        return JavaScriptClassType.doConvertJavaScriptValueToPromptoValue(context, item, klass, returnType.itemType);
                    }
                };
                return new IteratorValue(returnType.itemType, converting);
            }
        }
        return null; // TODO
    }

    static convertDict(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        return null; // TODO
    }

    static convertSet(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        return null; // TODO
    }

    static convertList(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        const maybeList = returnType instanceof ListType || returnType instanceof AnyType || (returnType && returnType.toString()=="Any");
        if(maybeList && (klass=="Array" || klass=="List")) {
            const itemType = returnType instanceof IterableType ? returnType.itemType : AnyType.instance;
            const items = (value as any[]).map(item => {
                klass = getTypeName(item)!;
                return JavaScriptClassType.doConvertJavaScriptValueToPromptoValue(context, item, klass, itemType);
            });
            return new ListValue(itemType, false, items);
        } else
            return null;
    }

    static convertDocument(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        const maybeDoc = returnType instanceof DocumentType || returnType instanceof AnyType || (returnType && returnType.toString()=="Any");
        if(maybeDoc && (klass=="object" || klass=="Object" || klass=="Document")) {
            const doc = new DocumentValue();
            Object.getOwnPropertyNames(value).filter(name =>!name.startsWith("$")).forEach(name => {
                const item = value[name as keyof typeof value];
                klass = getTypeName(item)!;
                const val = JavaScriptClassType.doConvertJavaScriptValueToPromptoValue(context, item, klass, AnyType.instance);
                doc.SetMemberValue(context, new Identifier(name), val);
            }, this);
            return doc;
        } else
            return null;
    }

    static convertNative(context: Context, value: any, klass: string, returnType: IType): IValue | null {
        const promptoType = JavaScriptClassType.valueToTypeMap.get(klass) || null;
        if (promptoType != null) {
            return promptoType.convertJavaScriptValueToPromptoValue(context, value, returnType);
        } else if(klass == 'number') {
            if (Number.isInteger(value)) {
                return IntegerType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
            } else {
                return DecimalType.instance.convertJavaScriptValueToPromptoValue(context, value, returnType);
            }
        } else
            return null;
    }

    static convertValue(value: any): IValue | null {
        if(value instanceof BaseValue)
            return value;
        else
            return null;
    }
}
