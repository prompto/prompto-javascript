import Instance from './Instance.js'
import { NullValue, DecimalValue, TextValue, IntegerValue, DocumentValue, NativeInstance } from './index.js'
import { CategoryType, DecimalType } from '../type/index.js'
import { Variable } from '../runtime/index.js'
import { Identifier, Operator } from '../grammar/index.js'
import { $DataStore } from '../store/index.js'
import { EnumeratedNativeDeclaration, EnumeratedCategoryDeclaration } from '../declaration/index.js'
import { NotStorableError, NotMutableError } from '../error/index.js'
import { convertFromJavaScript } from '../utils/index.js'
import { $Root } from "../intrinsic/$Root.js";

export default class ConcreteInstance extends Instance {

    constructor(context, declaration) {
        super(new CategoryType(declaration.id));
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

    toMutable() {
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
        this.values["dbId"] = convertFromJavaScript(dbId);
    }

    getAttributeNames() {
        return $Root.prototype.getAttributeNames.bind(this.values)();
    }

    getStorableData() {
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

    getMemberValue(context, attrName) {
        /* if(typeof(attrName) != typeof(""))
            throw "What?"; */
        if ("category" === attrName)
            return this.getCategory(context);
        else if ("json" === attrName)
            return super.getMemberValue(context, attrName);
        else
            return this.getAttributeValue(context, attrName);
    }

    getAttributeValue(context, attrName) {
        const stacked = getActiveGetters()[attrName] || null;
        const first = stacked==null;
        if(first)
            getActiveGetters()[attrName] = context;
        try {
            return this.doGetAttributeValue(context, attrName, first);
        } finally {
            if(first) {
                delete getActiveGetters()[attrName];
            }
        }
    }

    getCategory(context) {
        const decl = context.getRegisteredDeclaration(new Identifier("Category"));
        return new NativeInstance(context, decl, this.declaration);
    }

    doGetAttributeValue(context, attrName, allowGetter) {
        const getter = allowGetter ? this.declaration.findGetter(context, attrName) : null;
        if (getter != null) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else if (this.declaration.hasAttribute(context, attrName) || "dbId" === attrName) {
            return this.values[attrName] || NullValue.instance;
        } else if ("text" === attrName) {
            return new TextValue(this.toString());
        } else
            return NullValue.instance;
    }

    setMember(context, attrName, value) {
        /* if(typeof(attrName) != typeof(""))
            throw "What?"; */
        if(!this.mutable)
            throw new NotMutableError();
        const stacked = getActiveSetters()[attrName] || null;
        const first = stacked==null;
        if(first)
            getActiveSetters()[attrName] = context;
        try {
            this.doSetAttributeValue(context, attrName, value, first);
        } finally {
            if(first) {
                delete getActiveSetters()[attrName];
            }
        }
    }

    doSetAttributeValue(context, attrName, value, allowSetter) {
        const decl = context.getRegisteredDeclaration(attrName);
        const setter = allowSetter ? this.declaration.findSetter(context,attrName) : null;
        if(setter!=null) {
            // use attribute name as parameter name for incoming value
            context = context.newInstanceContext(this, null).newChildContext();
            const id = new Identifier(attrName);
            context.registerValue(new Variable(id, decl.getType()));
            context.setValue(id, value);
            value = setter.interpret(context);
        }
        value = this.autocast(decl, value);
        this.values[attrName] = value;
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(attrName, value.getStorableData(), this.getDbId());
    }

    autocast(decl, value) {
        if(value instanceof IntegerValue && decl.getType() === DecimalType.instance)
            value = new DecimalValue(value.DecimalValue());
        return value;
    }

    equals(obj) {
        if(obj === this) {
            return true;
        } else if(!(obj instanceof ConcreteInstance)) {
            return false;
        } else if(this.declaration!==obj.declaration) {
            return false;
        } else {
            const names = Object.getOwnPropertyNames(this.values);
            const otherNames = Object.getOwnPropertyNames(obj.values);
            if(names.length !== otherNames.length) {
                return false;
            }
            for(let i=0;i<names.length;i++) {
                const v1 = this.values[names[i]] || null;
                const v2 = obj.values[names[i]];
                if(v1 === v2) {
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
            if("dbId" !== name && typeof(this[name]) !== 'function')
                props.push(name + ":" + this.values[name].toString())
        }
        return "{" + props.join(", ") + "}";
    }

    Multiply(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.MULTIPLY);
        } catch(e) {
            return super.Multiply(context, value);
        }
    }

    Divide(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.DIVIDE);
        } catch(e) {
            return super.Divide(context, value);
        }
    }

    IntDivide(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.IDIVIDE);
        } catch(e) {
            return super.IntDivide(context, value);
        }
    }

    Modulo(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.MODULO);
        } catch(e) {
            return super.Modulo(context, value);
        }
    }

    Add(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.PLUS);
        } catch(e) {
            return super.Add(context, value);
        }
    }

    Subtract(context, value) {
        try {
            return this.interpretOperator(context, value, Operator.MINUS);
        } catch(e) {
            return super.Subtract(context, value);
        }
    }

    interpretOperator(context, value, operator) {
        const decl = this.declaration.getOperatorMethod(context, operator, value.type);
        context = context.newInstanceContext(this);
        const local = context.newChildContext();
        decl.registerParameters(local);
        const arg = decl.parameters[0];
        local.setValue(arg.id, value);
        return decl.interpret(local);
    }

    toDocumentValue(context) {
        const doc = new DocumentValue();
        Object.getOwnPropertyNames(this.values).map(name => {
            doc.values[name] = this.values[name].toDocumentValue(context);
        }, this);
        return doc;
    }

    toJsonNode() {
        const node = {};
        Object.getOwnPropertyNames(this.values).map(name => {
            node[name] = this.values[name].toJsonNode();
        }, this);
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



