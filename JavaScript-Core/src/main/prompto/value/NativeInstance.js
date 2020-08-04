var CategoryType = require("../type/CategoryType").CategoryType;
var Identifier = require("../grammar/Identifier").Identifier;
var TypeUtils = require("../utils/TypeUtils");
var Instance = require("./Value").Instance;
var $DataStore = require("../store/DataStore").$DataStore;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var Variable = require("../runtime/Variable").Variable;

class NativeInstance extends Instance {
    constructor(context, declaration, instance) {
        super(new CategoryType(declaration.id));
        this.declaration = declaration;
        this.storable = false;
        if(declaration.storable && $DataStore.instance) {
            var categories = declaration.collectCategories(context);
            this.storable = $DataStore.instance.newStorableDocument(categories, null);
        }
        this.instance = instance || this.makeInstance();
        return this;
    }

    makeInstance() {
        var bound = this.declaration.getBoundFunction(true);
        return new bound();
    }

    getType() {
        return new CategoryType(this.declaration.id);
    }

    getMemberValue(context, attrName) {
        if("category" === attrName)
            return this.getCategory(context);
        var stacked = getActiveGetters()[attrName] || null;
        var first = stacked==null;
        if(first)
            getActiveGetters()[attrName] = context;
        try {
            return this.doGetMember(context, attrName, first);
        } finally {
            if(first) {
                delete getActiveGetters()[attrName];
            }
        }
    }

    getCategory(context) {
        var decl = context.getRegisteredDeclaration(new Identifier("Category"));
        return new NativeInstance(context, decl, this.declaration);
    }

    doGetMember(context, attrName, allowGetter) {
        var getter = allowGetter ? this.declaration.findGetter(context,attrName) : null;
        if(getter!=null) {
            context = context.newInstanceContext(this, null).newChildContext();
            return getter.interpret(context);
        } else {
            var value = this.instance[attrName];
            return TypeUtils.convertFromJavaScript(value);
        }
    }

    setMember(context, attrName, value) {
        if(!this.mutable)
            throw new NotMutableError();
        var stacked = getActiveSetters()[attrName] || null;
        var first = stacked==null;
        if(first)
            getActiveSetters()[attrName] = context;
        try {
            this.doSetMember(context, attrName, value, first);
        } finally {
            if(first) {
                delete getActiveSetters()[attrName];
            }
        }
    }

    doSetMember(context, attrName, value, allowSetter) {
        var decl = context.getRegisteredDeclaration(attrName);
        var setter = allowSetter ? this.declaration.findSetter(context,attrName) : null;
        if(setter!=null) {
            // use attribute name as parameter name for incoming value
            context = context.newInstanceContext(this, null).newChildContext();
            context.registerValue(new Variable(attrName, decl.getType()));
            context.setValue(attrName, value);
            value = setter.interpret(context);
        }
        if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
            this.storable.setData(attrName, value.getStorableData(), null);
        this.instance[attrName] = value.convertToJavaScript();
    }
}

// don't call getters from getters, so register them
// TODO: thread local storage

var activeGetters = {};

function getActiveGetters() {
    return activeGetters;
}

// don't call setters from setters, so register them
var activeSetters = {};

function getActiveSetters() {
    return activeSetters;
}


exports.NativeInstance = NativeInstance;
