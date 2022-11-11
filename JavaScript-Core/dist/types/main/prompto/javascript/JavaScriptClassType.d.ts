import CategoryType from '../type/CategoryType';
import { IType } from '../type';
import { IValue } from '../value';
import { Identifier } from '../grammar';
import { Context } from "../runtime";
export default class JavaScriptClassType extends CategoryType {
    static valueToTypeMap: Map<string, IType>;
    static init(): void;
    static initializeValueToTypeMap(): void;
    id: Identifier;
    constructor(id: Identifier);
    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType): IValue;
    static doConvertJavaScriptValueToPromptoValue(context: Context, value: any, klass: string, returnType: IType): IValue;
    static convertCategory(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertIterator(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertDict(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertSet(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertList(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertDocument(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertNative(context: Context, value: any, klass: string, returnType: IType): IValue | null;
    static convertValue(value: any): IValue | null;
}
