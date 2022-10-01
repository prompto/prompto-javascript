import Instance from './Instance'
import {CategoryType, DecimalType} from '../type'
import {Context, Variable} from '../runtime'
import { Identifier } from '../grammar'
import {$DataStore, IStorable} from '../store'
import { NotMutableError } from '../error'
import { convertFromJavaScript } from '../utils'
import {AttributeDeclaration, NativeCategoryDeclaration} from "../declaration";
import {DecimalValue, IntegerValue, IValue, NullValue, TextValue} from "./index";

export default class NativeInstance extends Instance<any> {

    static newInstance(declaration: NativeCategoryDeclaration): any {
        const bound = declaration.getBoundFunction(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new bound();
    }

    _declaration: NativeCategoryDeclaration;
    storable: IStorable | null;
    activeGetters?: Map<string, Context>;
    activeSetters?: Map<string, Context>;

    constructor(context: Context, declaration: NativeCategoryDeclaration, instance?: any) {
        super(new CategoryType(declaration.id), instance || NativeInstance.newInstance(declaration));
        this.storable = null;
        if(declaration.storable && $DataStore.instance) {
            const categories = declaration.getAllCategories(context);
            this.storable = $DataStore.instance.newStorableDocument(categories, null);
        }
    }

    get declaration() {
        return this._declaration;
    }

    getType() {
        return new CategoryType(this.declaration.id);
    }

    GetMemberValue(context: Context, member: Identifier) {
        if ("category" == member.name)
            return this.getCategory(context);
        else
            return this.getAttributeValue(context, member);
    }

    getCategory(context: Context) {
        const decl = context.getRegisteredDeclaration(NativeCategoryDeclaration, new Identifier("Category"));
        return new NativeInstance(context, decl!, this.declaration);
    }

    getAttributeValue(context: Context, member: Identifier): IValue {
        const stacked = this.activeGetters ? this.activeGetters.get(member.name) || null : null;
        const first = stacked==null;
        if(first) {
            if(!this.activeGetters)
                this.activeGetters = new Map<string, Context>();
            this.activeGetters.set(member.name, context);
        }
        try {
            return this.doGetAttributeValue(context, member, first) || NullValue.instance;
        } finally {
            if(first) {
                this.activeGetters?.delete(member.name);
                if(!this.activeGetters?.size)
                    delete this.activeGetters;
            }
        }
    }

    doGetAttributeValue(context: Context, member: Identifier, allowGetter: boolean): IValue | null {
        const getter = allowGetter ? this.declaration.findGetter(context, member) : null;
        if (getter) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else if (this.declaration.hasAttribute(context, member) || "dbId" == member.name) {
            const obj = this.value as object;
            const value = obj[member.name as keyof typeof obj] || null;
            return convertFromJavaScript(value);
        } else if ("text" == member.name) {
            return new TextValue(this.toString());
        } else
            return null;
    }

    SetMemberValue(context: Context, member: Identifier, value: IValue) {
        if(!this.mutable)
            throw new NotMutableError();
        const stacked = this.activeSetters ? this.activeSetters.get(member.name) || null : null;
        const first = stacked==null;
        if(first) {
            if(!this.activeSetters)
                this.activeSetters = new Map<string, Context>();
            this.activeSetters.set(member.name, context);
        }
        try {
            this.doSetAttributeValue(context, member, value, first);
        } finally {
            if(first) {
                this.activeSetters?.delete(member.name);
                if(!this.activeSetters?.size)
                    delete this.activeSetters;
            }
        }
    }

    doSetAttributeValue(context: Context, member: Identifier, value: IValue, allowSetter: boolean) {
        const decl = context.getRegisteredDeclaration(AttributeDeclaration, member)!;
        const setter = allowSetter ? this.declaration.findSetter(context, member) : null;
        if(setter) {
            // use attribute name as parameter name for incoming value
            context = context.newInstanceContext(this, null).newChildContext();
            context.registerInstance(new Variable(member, decl.getType(context)), true);
            context.setValue(member, value);
            value = setter.interpret(context)!;
        }
        value = this.autocast(decl, value);
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(member.name, value.getStorableData(), null);
        const obj = this.value as object;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        obj[member.name as keyof typeof obj] = value.convertToJavaScript() as never;

    }

    autocast(decl: AttributeDeclaration, value: IValue) {
        if(value instanceof IntegerValue && decl.getType() == DecimalType.instance)
            value = new DecimalValue(value.DecimalValue());
        return value;
    }

    ToMutable(): IValue {
        throw new Error("Should never get there!");
    }

    getMemberNames(): string[] {
        throw new Error("Should never get there!");
    }

    setDbId(dbId: any): void {
        throw new Error("Should never get there!");
    }

}

