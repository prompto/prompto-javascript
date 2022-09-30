import Instance from './Instance'
import { NullValue, DbIdValue, DecimalValue, TextValue, IntegerValue, DocumentValue, NativeInstance } from './index'
import { CategoryType, DecimalType } from '../type'
import {Context, Variable} from '../runtime'
import { Identifier, Operator } from '../grammar'
import { $DataStore } from '../store'
import {EnumeratedNativeDeclaration, EnumeratedCategoryDeclaration, ConcreteCategoryDeclaration} from '../declaration'
import { NotStorableError, NotMutableError } from '../error'
import { $Root } from "../../../main/prompto/intrinsic/$Root.js";
import IValue from "../../../main/prompto/value/IValue";
import {JsonNode} from "../json";

export default class ConcreteInstance extends Instance<Map<string, IValue>> {

    declaration: ConcreteCategoryDeclaration;
    storable: boolean;
    mutable: boolean;

    constructor(context: Context, declaration: ConcreteCategoryDeclaration) {
        super(new CategoryType(declaration.id), new Map<string, IValue>());
        this.declaration = declaration;
        this.storable = null;
        if(declaration.storable) {
            const categories = declaration.collectCategories(context);
            const dbIdFactory = {
                provider: this.getDbId.bind(this),
                listener: this.setDbId.bind(this)
            };
            this.storable = $DataStore.instance.newStorableDocument(categories, dbIdFactory);
        }
        this.mutable = false;
        this.values = {};
    }

    ToMutable() {
        const result = Object.create(this);
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

    getDbId() {
        const dbId = this.values["dbId"] || null;
        return dbId == null ? null : dbId.getStorableData();
    }

    getOrCreateDbId() {
        let dbId = this.getDbId();
        if(dbId==null) {
            dbId = this.storable.getOrCreateDbId();
            this.setDbId(dbId);
        }
        return dbId;
    }

    setDbId(dbId) {
        this.values["dbId"] = new DbIdValue(dbId);
    }

    getAttributeNames() {
        return $Root.prototype.getAttributeNames.bind(this.values)();
    }

    getStorableData(): any {
        // this is called when storing the instance as a field value
        // if this is an enum then we simply store the symbol name
        if(this.declaration instanceof EnumeratedNativeDeclaration || this.declaration instanceof EnumeratedCategoryDeclaration)
            return this.values["name"].getStorableData()
        // otherwise we just return the dbId, the instance data itself will be collected as part of collectStorables
        if (this.storable == null)
            throw new NotStorableError();
        else
            return this.getOrCreateDbId();
    }

    getMemberNames() {
        return Object.getOwnPropertyNames(this.values);
    }

    collectStorables(set) {
        if(this.declaration instanceof EnumeratedNativeDeclaration || this.declaration instanceof EnumeratedCategoryDeclaration)
            return;
        if (this.storable==null)
            throw new NotStorableError();
        if (this.storable.isDirty()) {
            this.getOrCreateDbId();
            set.add(this.storable);
        }
        this.getAttributeNames().forEach(name => this.values[name].collectStorables(set));
    }

    getMemberValue(context, id) {
        switch(id.name) {
            case "category":
                return this.getCategory(context);
            case "json":
                return super.getMemberValue(context, id);
            default:
                return this.getAttributeValue(context, id);
        }
    }

    getAttributeValue(context, id) {
        const stacked = getActiveGetters()[id.name] || null;
        const first = stacked==null;
        if(first)
            getActiveGetters()[id.name] = context;
        try {
            return this.doGetAttributeValue(context, id, first);
        } finally {
            if(first) {
                delete getActiveGetters()[id.name];
            }
        }
    }

    getCategory(context) {
        const decl = context.getRegisteredDeclaration(new Identifier("Category"));
        return new NativeInstance(context, decl, this.declaration);
    }

    doGetAttributeValue(context, id, allowGetter) {
        const getter = allowGetter ? this.declaration.findGetter(context, id) : null;
        if (getter != null) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else if (this.declaration.hasAttribute(context, id) || "dbId" == id.name) {
            return this.values[id.name] || NullValue.instance;
        } else if ("text" == id.name) {
            return new TextValue(this.toString());
        } else
            return NullValue.instance;
    }

    setMember(context, id, value) {
        if(!this.mutable)
            throw new NotMutableError();
        const stacked = getActiveSetters()[id.name] || null;
        const first = stacked==null;
        if(first)
            getActiveSetters()[id.name] = context;
        try {
            this.doSetAttributeValue(context, id, value, first);
        } finally {
            if(first) {
                delete getActiveSetters()[id.name];
            }
        }
    }

    doSetAttributeValue(context, id, value, allowSetter) {
        const decl = context.getRegisteredDeclaration(id);
        const setter = allowSetter ? this.declaration.findSetter(context, id) : null;
        if(setter!=null) {
            // use attribute name as parameter name for incoming value
            context = context.newInstanceContext(this, null).newChildContext();
            context.registerValue(new Variable(id, decl.getType()));
            context.setValue(id, value);
            value = setter.interpret(context);
        }
        value = this.autocast(decl, value);
        this.values[id.name] = value;
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(id.name, value.getStorableData(), this.getDbId());
    }

    autocast(decl, value) {
        if(value instanceof IntegerValue && decl.getType() == DecimalType.instance)
            value = new DecimalValue(value.DecimalValue());
        return value;
    }

    equals(obj) {
        if(obj == this) {
            return true;
        } else if(!(obj instanceof ConcreteInstance)) {
            return false;
        } else if(this.declaration!=obj.declaration) {
            return false;
        } else {
            const names = Object.getOwnPropertyNames(this.values);
            const otherNames = Object.getOwnPropertyNames(obj.values);
            if(names.length != otherNames.length) {
                return false;
            }
            for(let i=0;i<names.length;i++) {
                const v1 = this.values[names[i]] || null;
                const v2 = obj.values[names[i]];
                if(v1 == v2) {
                    continue;
                } else if(v1==null || v2==null) {
                    return false;
                } else {
                    if(v1.equals) {
                        if(!v1.equals(v2)) {
                            return false;
                        }
                    } else if(v2.equals) {
                        if(!v2.equals(v1)) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    toString() {
        const props = [];
        for(const name in this.values) {
            if("dbId" != name && typeof(this[name]) != 'function')
                props.push(name + ":" + this.values[name].toString())
        }
        return "{" + props.join(", ") + "}";
    }

    Multiply(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MULTIPLY);
        } catch(e) {
            return super.Multiply(context, value);
        }
    }

    Divide(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.DIVIDE);
        } catch(e) {
            return super.Divide(context, value);
        }
    }

    IntDivide(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.IDIVIDE);
        } catch(e) {
            return super.IntDivide(context, value);
        }
    }

    Modulo(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MODULO);
        } catch(e) {
            return super.Modulo(context, value);
        }
    }

    Add(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.PLUS);
        } catch(e) {
            return super.Add(context, value);
        }
    }

    Subtract(context, value): IValue {
        try {
            return this.interpretOperator(context, value, Operator.MINUS);
        } catch(e) {
            return super.Subtract(context, value);
        }
    }

    interpretOperator(context, value, operator): IValue {
        const decl = this.declaration.getOperatorMethod(context, operator, value.type);
        context = context.newInstanceContext(this);
        const local = context.newChildContext();
        decl.registerParameters(local);
        const arg = decl.parameters[0];
        local.setValue(arg.id, value);
        return decl.interpret(local);
    }

    toDocumentValue(context: Context): DocumentValue {
        const doc = new DocumentValue();
        Object.getOwnPropertyNames(this.values).map(name => {
            doc.values[name] = this.values[name].toDocumentValue(context);
        }, this);
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

// don't call getters from getters, so register them
// TODO: thread local storage

const activeGetters = {};

function getActiveGetters() {
    return activeGetters;
}


// don't call setters from setters, so register them

const activeSetters = {};

function getActiveSetters() {
    return activeSetters;
}



