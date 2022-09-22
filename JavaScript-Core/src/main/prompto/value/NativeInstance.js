import Instance from './Instance.ts'
import { CategoryType } from '../type'
import { Variable } from '../runtime'
import { Identifier } from '../grammar'
import { $DataStore } from '../store'
import { NotMutableError } from '../error'
import { convertFromJavaScript } from '../utils'

export default class NativeInstance extends Instance {

    constructor(context, declaration, instance) {
        super(new CategoryType(declaration.id));
        this.declaration = declaration;
        this.storable = false;
        if(declaration.storable && $DataStore.instance) {
            const categories = declaration.collectCategories(context);
            this.storable = $DataStore.instance.newStorableDocument(categories, null);
        }
        this.instance = instance || this.makeInstance();
    }

    makeInstance() {
        const bound = this.declaration.getBoundFunction(true);
        return new bound();
    }

    getType() {
        return new CategoryType(this.declaration.id);
    }

    getMemberValue(context, id) {
        if("category" === id.name)
            return this.getCategory(context);
        const stacked = getActiveGetters()[id.name] || null;
        const first = stacked==null;
        if(first)
            getActiveGetters()[id.name] = context;
        try {
            return this.doGetMember(context, id, first);
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

    doGetMember(context, id, allowGetter) {
        const getter = allowGetter ? this.declaration.findGetter(context, id) : null;
        if(getter!=null) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else {
            const value = this.instance[id.name];
            return convertFromJavaScript(value);
        }
    }

    setMember(context, id, value) {
        if(!this.mutable)
            throw new NotMutableError();
        const stacked = getActiveSetters()[id.name] || null;
        const first = stacked==null;
        if(first)
            getActiveSetters()[id.name] = context;
        try {
            this.doSetMember(context, id, value, first);
        } finally {
            if(first) {
                delete getActiveSetters()[id.name];
            }
        }
    }

    doSetMember(context, id, value, allowSetter) {
        const decl = context.getRegisteredDeclaration(id);
        const setter = allowSetter ? this.declaration.findSetter(context, id) : null;
        if(setter!=null) {
            // use attribute name as parameter name for incoming value
            context = context.newInstanceContext(this, null).newChildContext();
            context.registerValue(new Variable(id, decl.getType()));
            context.setValue(id, value);
            value = setter.interpret(context);
        }
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(id.name, value.getStorableData(), null);
        this.instance[id.name] = value.convertToJavaScript();
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


