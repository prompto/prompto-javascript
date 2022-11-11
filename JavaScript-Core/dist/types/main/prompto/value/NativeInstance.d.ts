import Instance from './Instance';
import { CategoryType } from '../type';
import { Context } from '../runtime';
import { Identifier } from '../grammar';
import { IStorable } from '../store';
import { AttributeDeclaration, NativeCategoryDeclaration } from "../declaration";
import { IValue } from "./index";
export default class NativeInstance extends Instance<any> {
    static newInstance(declaration: NativeCategoryDeclaration): any;
    _declaration: NativeCategoryDeclaration;
    storable: IStorable | null;
    activeGetters?: Map<string, Context>;
    activeSetters?: Map<string, Context>;
    constructor(context: Context, declaration: NativeCategoryDeclaration, instance?: any);
    get declaration(): NativeCategoryDeclaration;
    getType(): CategoryType;
    GetMemberValue(context: Context, member: Identifier): IValue | NativeInstance;
    getCategory(context: Context): NativeInstance;
    getAttributeValue(context: Context, member: Identifier): IValue;
    doGetAttributeValue(context: Context, member: Identifier, allowGetter: boolean): IValue | null;
    SetMemberValue(context: Context, member: Identifier, value: IValue): void;
    doSetAttributeValue(context: Context, member: Identifier, value: IValue, allowSetter: boolean): void;
    autocast(decl: AttributeDeclaration, value: IValue): IValue;
    ToMutable(): IValue;
    getMemberNames(): string[];
    setDbId(dbId: any): void;
}
