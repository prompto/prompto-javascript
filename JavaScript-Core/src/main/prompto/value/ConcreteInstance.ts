import Instance from './Instance'
import {
    NullValue,
    DbIdValue,
    DecimalValue,
    TextValue,
    IntegerValue,
    DocumentValue,
    NativeInstance,
    IValue
} from './index'
import { CategoryType, DecimalType } from '../type'
import {Context, Variable} from '../runtime'
import { Identifier, Operator } from '../grammar'
import {$DataStore, IStorable} from '../store'
import {
    EnumeratedCategoryDeclaration,
    ConcreteCategoryDeclaration, NativeCategoryDeclaration, AttributeDeclaration
} from '../declaration'
import { SyntaxError, NotStorableError, NotMutableError } from '../error'
import {JsonNode} from "../json";
import {equalMaps} from "../utils/Utils";

export default class ConcreteInstance extends Instance<Map<string, IValue>> {

    _declaration: ConcreteCategoryDeclaration;
    storable: IStorable | null;
    mutable: boolean;
    activeGetters?: Map<string, Context>;
    activeSetters?: Map<string, Context>;

    constructor(context: Context, declaration: ConcreteCategoryDeclaration) {
        super(new CategoryType(declaration.id), new Map<string, IValue>());
        this._declaration = declaration;
        this.storable = null;
        if(declaration.storable) {
            const categories = declaration.getAllCategories(context);
            const dbIdFactory = {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                provider: () => this.getDbId(),
                listener: (dbId: any) => this.setDbId(dbId)
            };
            this.storable = $DataStore.instance.newStorableDocument(categories, dbIdFactory);
        }
        this.mutable = false;
    }

    get declaration() {
        return this._declaration;
    }

    ToMutable() {
        const result = Object.create(this) as ConcreteInstance;
        result.type = new CategoryType(this.type.id, true);
        result.mutable = true;
        return result;
    }

    getType() {
        return this.type;
    }

    convertToJavaScript() {
        return this; // TODO, until we have a translator
    }

    getDbId(): any {
        const dbId = this.value.get("dbId") || null;
        return dbId == null ? null : dbId.getStorableData();
    }

    getOrCreateDbId(): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let dbId = this.getDbId();
        if(!dbId) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            dbId = this.storable!.getOrCreateDbId();
            this.setDbId(dbId);
        }
        return dbId;
    }

    setDbId(dbId: any) {
        this.value.set("dbId", new DbIdValue(dbId));
    }

    getAttributeNames() {
        return Array.from(this.value.keys())
            .filter(name => name!="dbId" && !name.startsWith('$'));
    }

    getStorableData(): any {
        // this is called when storing the instance as a field value
        // if this is an enum then we simply store the symbol name
        if(this.declaration instanceof EnumeratedCategoryDeclaration)
            return this.value.get("name")!.getStorableData()
        // otherwise we just return the dbId, the instance data itself will be collected as part of collectStorables
        if (this.storable == null)
            throw new NotStorableError();
        else
            return this.getOrCreateDbId();
    }

    getMemberNames() {
        return Array.from(this.value.keys());
    }

    collectStorables(set: Set<IStorable>) {
        if(this.declaration instanceof EnumeratedCategoryDeclaration)
            return;
        if (this.storable==null)
            throw new NotStorableError();
        if (this.storable.isDirty()) {
            this.getOrCreateDbId();
            set.add(this.storable);
        }
        for(const value of this.value.values())
            value.collectStorables(set);
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch(member.name) {
            case "category":
                return this.getCategory(context);
            case "json":
                return super.GetMemberValue(context, member);
            default:
                return this.getAttributeValue(context, member);
        }
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

    getCategory(context: Context) {
        const decl = context.getRegisteredDeclaration(NativeCategoryDeclaration, new Identifier("Category"));
        return new NativeInstance(context, decl!, this.declaration);
    }

    doGetAttributeValue(context: Context, member: Identifier, allowGetter: boolean): IValue | null {
        const getter = allowGetter ? this.declaration.findGetter(context, member) : null;
        if (getter) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else if (this.declaration.hasAttribute(context, member) || "dbId" == member.name) {
            return this.value.get(member.name) || null;
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
        this.value.set(member.name, value);
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(member.name, value.getStorableData(), this.getDbId());
    }

    autocast(decl: AttributeDeclaration, value: IValue) {
        if(value instanceof IntegerValue && decl.getType() == DecimalType.instance)
            value = new DecimalValue(value.DecimalValue());
        return value;
    }

    equals(obj: any) {
        return obj == this || (obj instanceof ConcreteInstance && this.equalsConcreteInstance(obj));
    }

    equalsConcreteInstance(obj: ConcreteInstance) {
        return this.declaration == obj.declaration && equalMaps(this.value, obj.value);
    }

    toString() {
        const entries = Array.from(this.value.entries())
            .map(entry => entry[0] + ":" + entry[1].toString());
        return "{" + entries.join(", ") + "}";
    }

    Multiply(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MULTIPLY);
        } catch(e) {
            return super.Multiply(context, value);
        }
    }

    Divide(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.DIVIDE);
        } catch(e) {
            return super.Divide(context, value);
        }
    }

    IntDivide(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.IDIVIDE);
        } catch(e) {
            return super.IntDivide(context, value);
        }
    }

    Modulo(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MODULO);
        } catch(e) {
            return super.Modulo(context, value);
        }
    }

    Add(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.PLUS);
        } catch(e) {
            return super.Add(context, value);
        }
    }

    Subtract(context: Context, value: IValue): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MINUS);
        } catch(e) {
            return super.Subtract(context, value);
        }
    }

    interpretOperator(context: Context, value: IValue, operator: Operator): IValue {
        const decl = this.declaration.getOperatorMethod(context, operator, value.type);
        if(!decl)
            throw new SyntaxError("No such operator: " + operator.name);
        context = context.newInstanceContext(this, null);
        const local = context.newChildContext();
        decl.registerParameters(local);
        const arg = decl.parameters[0];
        local.setValue(arg.id, value);
        return decl.interpret(local) || NullValue.instance;
    }

    toDocumentValue(context: Context): DocumentValue {
        const doc = new DocumentValue();
        for(const entry of this.value.entries()) {
            doc.SetMemberValue(context, new Identifier(entry[0]), entry[1].toDocumentValue(context));
        }
        return doc;
    }

    toJsonNode(): JsonNode {
        const node = new Map<string, JsonNode>();
        this.value.forEach((value, key) => {
            node.set(key, value.toJsonNode());
        })
       return node;
    }
}




