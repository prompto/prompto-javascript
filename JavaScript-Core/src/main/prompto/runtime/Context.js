import { ProblemListener, ProblemCollector } from "../problem/index"
import { MethodDeclarationMap, Variable, LinkedValue, WidgetField } from "./index"
import { AttributeDeclaration, EnumeratedCategoryDeclaration, EnumeratedNativeDeclaration, CategoryDeclaration, ConcreteCategoryDeclaration } from "../declaration/index"
import { DecimalType, MethodType } from "../type/index"
import { IntegerValue, DecimalValue, ClosureValue, ConcreteInstance } from "../value/index"
import { InternalError } from "../error/index"

class Context {
  
    constructor() {
        this.globals = null;
        this.calling = null;
        this.parent = null; // for inner methods
        this.debugger = null;
        this.declarations = {};
        this.tests = {};
        this.instances = {};
        this.values = {};
        this.nativeBindings = {};
        this.problemListener = new ProblemListener();
    }

    static newGlobalsContext() {
        const context = new Context();
        context.globals = context;
        context.calling = null;
        context.parent = null;
        context.debugger = null;
        return context;
    }

    isGlobalContext() {
        return this===this.globals;
    }

    getCallingContext() {
        return this.calling;
    }

    getParentMostContext() {
        if(this.parent === null) {
            return this;
        } else {
            return this.parent.getParentMostContext();
        }
    }

    getClosestInstanceContext() {
        if(this.parent === null) {
            return null;
        } else {
            return this.parent.getClosestInstanceContext();
        }
    }

    getParentContext() {
        return this.parent;
    }

    setParentContext(parent) {
        this.parent = parent;
    }

    isChildOf(context) {
        return context === this.parent || (this.parent && this.parent.isChildOf(context));
    }

    newResourceContext() {
        const context = new ResourceContext();
        context.globals = this.globals;
        context.calling = this.calling;
        context.parent = this;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newLocalContext() {
        const context = new Context();
        context.globals = this.globals;
        context.calling = this;
        context.parent = null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newDocumentContext(doc, isChild) {
        const context = new DocumentContext(doc);
        context.globals = this.globals;
        context.calling = isChild ? this.calling : this;
        context.parent = isChild ? this : null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newBuiltInContext(value) {
        const context = new BuiltInContext(value);
        context.globals = this.globals;
        context.calling = this;
        context.parent = null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newInstanceContext(instance, type, isChild) {
        const context = new InstanceContext(instance, type);
        context.globals = this.globals;
        context.calling = isChild ? this.calling : this;
        context.parent = isChild ? this : null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        const decl = context.getDeclaration();
        if(decl)
            decl.processAnnotations(context, true);
        return context;
    }

    newChildContext() {
        const context = new Context();
        context.globals = this.globals;
        context.calling = this.calling;
        context.parent = this;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newMemberContext(type) {
        return this.newInstanceContext(null, type, false);
    }

    clone() {
        const context = new Context();
        context.globals = context;
        context.calling = null;
        context.parent = null;
        context.debugger = null;
        // copy from
        context.declarations = Object.create(this.declarations);
        context.tests = Object.create(this.tests);
        context.instances = Object.create(this.instances);
        context.values = Object.create(this.values);
        context.nativeBindings = Object.create(this.nativeBindings);
        return context;
    }

    pushProblemListener() {
        if (this.problemListeners)
            this.problemListeners.push(this.problemListener);
        else
            this.problemListeners = [this.problemListener];
        this.problemListener = this.problemListener instanceof ProblemListener ? new ProblemListener() : new ProblemCollector();
    }

    popProblemListener() {
        this.problemListener = this.problemListeners.pop();
        if(this.problemListeners.length==0)
            delete this.problemListeners;
    }

    getCatalog() {
        if (this != this.globals)
            return this.globals.getCatalog();
        else
            return this.getLocalCatalog();
    }

    getLocalCatalog() {
        const catalog = { attributes : [], methods : [], categories : [], enumerations : [], tests : [], widgets: []};
        for(const name in this.declarations) {
            const decl = this.declarations[name];
            if(decl instanceof AttributeDeclaration)
                catalog.attributes.push(name);
            else if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration) {
                const info = {};
                info.name = decl.name;
                info.symbols = decl.symbols.map(s => s.name);
                catalog.enumerations.push(info);
            } else if(decl instanceof CategoryDeclaration) {
                if(decl.isWidget(this))
                    catalog.widgets.push(name);
                else
                    catalog.categories.push(name);
            } else if(decl instanceof MethodDeclarationMap) {
                const method = {};
                method.name = decl.name;
                method.protos = [];
                for (const proto in decl.protos) {
                    const main = decl.protos[proto].isEligibleAsMain();
                    method.protos.push({proto: proto, main: main});
                }
                catalog.methods.push(method);
            }
        }
        for(const name in this.tests)
            catalog.tests.push(name);
        // minimize for UI optimization
        if(catalog.attributes.length <= 0)
            delete catalog.attributes;
        if(catalog.categories.length  <= 0)
            delete catalog.categories;
        if(catalog.widgets.length  <= 0)
            delete catalog.widgets;
        if(catalog.enumerations.length  <= 0)
            delete catalog.enumerations;
        if(catalog.methods.length  <= 0)
            delete catalog.methods;
        if(catalog.tests.length <= 0)
            delete catalog.tests;
        return catalog;
    }

    findAttribute(name) {
        if(this===this.globals)
            return this.declarations[name] || (this.parent ? this.parent.findAttribute(name) : null);
        else
            return this.globals.findAttribute(name);
    }

    getAllAttributes() {
        if(this===this.globals) {
            let list = [];
            for(const name in this.declarations) {
                if(this.declarations[name] instanceof AttributeDeclaration)
                    list.push(this.declarations[name]);
            }
            if(this.parent)
                list = list.concat(this.parent.getAllAttributes());
            return list;
        } else
            return this.globals.getAllAttributes();
    }

    getRegistered(name) {
        // resolve upwards, since local names override global ones
        let actual = this.declarations[name] || null;
        if(actual!==null) {
            return actual;
        }
        actual = this.instances[name] || null;
        if(actual!==null) {
            return actual;
        } else if(this.parent!==null) {
            return this.parent.getRegistered(name);
        } else if(this.globals!==this) {
            return this.globals.getRegistered(name);
        } else {
            return null;
        }
    }

    getRegisteredDeclaration(name) {
        // resolve upwards, since local names override global ones
        const actual = this.declarations[name] || null;
        if(actual!==null) {
            return actual;
        } else if(this.parent!==null) {
            return this.parent.getRegisteredDeclaration(name);
        } else if(this.globals!==this) {
            return this.globals.getRegisteredDeclaration(name);
        } else {
            return null;
        }
    }

    getTypedDeclaration(klass, name) {
        const decl = this.getRegisteredDeclaration(name);
        if(decl==null || !klass.prototype.isPrototypeOf(decl))
            return null;
        else
            return decl;
    }

    getLocalDeclaration(name) {
        const actual = this.declarations[name] || null;
        if (actual !== null) {
            return actual;
        } else if (this.parent !== null) {
            return this.parent.getLocalDeclaration(name);
        } else {
            return null;
        }
    }

    registerDeclaration(declaration) {
        if(this.checkDuplicate(declaration))
            this.declarations[declaration.name] = declaration;
    }

    checkDuplicate(declaration) {
        const actual = this.getRegistered(declaration.name) || null;
        if (actual !== null && actual !== declaration)
            this.problemListener.reportDuplicate(declaration.id);
        return actual === null;
    }

    unregisterTestDeclaration(declaration) {
        delete this.tests[declaration.name];
    }

    unregisterMethodDeclaration(declaration, proto) {
        const map = this.declarations[declaration.name];
        if(map && map.unregister(proto))
            delete this.declarations[declaration.name];
    }

    unregisterDeclaration(declaration) {
        delete this.declarations[declaration.name];
    }

    registerMethodDeclaration(declaration) {
        let actual = this.checkDuplicateMethod(declaration);
        if (actual === null) {
            actual = new MethodDeclarationMap(declaration.name);
            this.declarations[declaration.name] = actual;
        }
        actual.register(declaration, this.problemListener);
    }

    checkDuplicateMethod(declaration) {
        const actual = this.getRegistered(declaration.name) || null;
        if (actual !== null && !(actual instanceof MethodDeclarationMap))
            this.problemListener.reportDuplicate(declaration.id);
        return actual;
    }

    registerTestDeclaration(declaration) {
        const actual = this.tests[declaration.name] || null;
        if(actual!==null)
            this.problemListener.reportDuplicate(declaration.id);
        this.tests[declaration.name] = declaration;
    }

    getRegisteredTest(name) {
        // resolve upwards, since local names override global ones
        const actual = this.tests[name] || null;
        if(actual!==null) {
            return actual;
        } else if(this.parent!==null) {
            return this.parent.getRegisteredTest(name);
        } else if(this.globals!==this) {
            return this.globals.getRegisteredTest(name);
        } else {
            return null;
        }
    }

    hasTests() {
        for(const test in this.tests)
            return true;
        return false;
    }

    getTestDeclaration(testName) {
        return this.tests[testName];
    }

    registerNativeBinding(type, declaration) {
        if(this === this.globals)
            this.nativeBindings[type] = declaration;
        else
            this.globals.registerNativeBinding(type, declaration);
    }

    getNativeBinding(type) {
        if(this===this.globals) {
            const binding = this.nativeBindings[type] || null;
            if (binding !== null)
                return binding;
            else if (this.parent !== null)
                return this.parent.getNativeBinding(type);
            else
                return null;
        } else
            return this.globals.getNativeBinding(type);
    }

    getRegisteredValue(name) {
        const context = this.contextForValue(name);
        if (context === null)
            return null;
        else
            return context.readRegisteredValue(name);
    }

    readRegisteredValue(name) {
        return this.instances[name] || null;
    }

    registerValue(value, checkDuplicate) {
        if(checkDuplicate === undefined)
            checkDuplicate = true;
        if(checkDuplicate) {
            // only explore current context
            const actual = this.instances[value.name] || null;
            if(actual!==null)
                this.problemListener.reportDuplicate(value.id);
        }
        this.instances[value.name] = value;
    }

    unregisterValue(value) {
        delete this.instances[value.name];
    }

    hasValue(id) {
        return this.contextForValue(id.name) !== null;
    }

    getValue(id) {
        const context = this.contextForValue(id.name);
        if(context===null)
            this.problemListener.reportUnknownVariable(id);
        return context.readValue(id);
    }

    readValue(id) {
        const value = this.values[id.name] || null;
        if(value===null)
            this.problemListener.reportEmptyVariable(id);
        if(value instanceof LinkedValue)
            return value.context.getValue(id);
        else
            return value;
    }

    setValue(id, value) {
        const context = this.contextForValue(id.name);
        if(context===null)
            this.problemListener.reportUnknownVariable(id);
        context.writeValue(id, value);
    }

    writeValue(id, value) {
        value = this.autocast(id.name, value);
        const current = this.values[id.name];
        if(current instanceof LinkedValue)
            current.context.setValue(id, value);
        else
            this.values[id.name] = value;
    }

    autocast(name, value) {
        if(value !== null && value instanceof IntegerValue) {
            const actual = this.instances[name];
            if(actual.getType(this) === DecimalType.instance)
                value = new DecimalValue(value.DecimalValue());
        }
        return value;
    }

    contextForValue(name) {
        // resolve upwards, since local names override global ones
        const actual = this.instances[name] || null;
        if(actual!==null) {
            return this;
        } else if(this.parent!==null) {
            return this.parent.contextForValue(name);
        } else if(this.globals!==this) {
            return this.globals.contextForValue(name);
        } else {
            return null;
        }
    }

    contextForDeclaration(name) {
        // resolve upwards, since local names override global ones
        const actual = this.declarations[name] || null;
        if(actual!==null) {
            return this;
        } else if(this.parent!==null) {
            return this.parent.contextForDeclaration(name);
        } else if(this.globals!==this) {
            return this.globals.contextForDeclaration(name);
        } else {
            return null;
        }
    }

    enterMethod(method) {
        if(this.debugger !== null) {
            this.debugger.enterMethod(this, method);
        }
    }

    leaveMethod(method) {
        if(this.debugger !== null) {
            this.debugger.leaveMethod(this, method);
        }
    }

    enterStatement(statement) {
        if(this.debugger !== null) {
            this.debugger.enterStatement(this, statement);
        }
    }

    leaveStatement(statement) {
        if(this.debugger !== null) {
            this.debugger.leaveStatement(this, statement);
        }
    }

    terminated() {
        if (this.debugger !== null) {
            this.debugger.terminated();
        }
    }

    loadSingleton(type) {
        if(this === this.globals) {
            let value = this.values[type.name] || null;
            if(value === null) {
                const decl = this.declarations[type.name] || null;
                if(!(decl instanceof ConcreteCategoryDeclaration))
                    throw new InternalError("No such singleton:" + type.name);
                value = new ConcreteInstance(this, decl);
                value.mutable = true; // a singleton is protected by "with x do", so always mutable in that context
                this.values[type.name] = value;
            }
            if(value instanceof ConcreteInstance)
                return value;
            else
                throw new InternalError("Not a concrete instance:" + value);
        } else
            return this.globals.loadSingleton(type);
    }
}

class ResourceContext extends Context {

    constructor() {
        super();
    }
}

class InstanceContext extends Context {

    constructor(instance, type) {
        super();
        this.instance = instance || null;
        this.instanceType = type !== null ? type : instance.type;
        this.widgetFields = null;
    }

    getClosestInstanceContext() {
        return this;
    }

    getRegistered(name) {
        if(this.widgetFields) {
            const field = this.widgetFields[name];
            if(field)
                return field;
        }
        const actual = super.getRegistered(name);
        if (actual)
            return actual;
        const decl = this.getDeclaration();
        if (decl==null)
            return null;
        const methods = decl.getMemberMethodsMap(this, name);
        if(methods && !methods.isEmpty())
            return methods;
        else if(decl.hasAttribute(this, name))
            return this.getTypedDeclaration(typeof(AttributeDeclaration), name);
        else
            return null;
    }

    registerWidgetField(id, type, createdBy) {
        if(!this.widgetFields)
            this.widgetFields = {};
        const widgetField = this.widgetFields[id.name];
        if(widgetField) {
            // we control reentrance by registering which processor created the widgetField
            if(widgetField.createdBy == createdBy)
                return;
            this.getProblemListener().reportDuplicate(id);
        } else
            this.widgetFields[id.name] = new WidgetField(id.name, type, createdBy);
    }

    overrideWidgetFieldType(id, type, updatedBy) {
        const widgetField = this.widgetFields ? this.widgetFields[id.name] : null;
        if(widgetField) {
            widgetField.type = type;
            widgetField.updatedBy = updatedBy;
        } else
            this.problemListener.reportUnknownIdentifier(id, id.name);
    }

    getTypedDeclaration(klass, name) {
        if (klass === MethodDeclarationMap) {
            const decl = this.getDeclaration();
            if (decl) {
                const methods = decl.getMemberMethodsMap(this, name);
                if (methods && !methods.isEmpty())
                    return methods;
            }
        }
        return super.getTypedDeclaration(klass, name)
    }

    readRegisteredValue(name) {
        let actual = this.instances[name] || null;
        // not very pure, but avoids a lot of complexity when registering a value
        if(actual === null) {
            const attr = this.getRegisteredDeclaration(name);
            if(attr instanceof AttributeDeclaration) {
                const type = attr.getType();
                actual = new Variable(name, type);
                this.instances[name] = actual;
            }
        }
        return actual;
    }

    contextForValue(name) {
        if("this" === name)
            return this;
        else if(this.widgetFields!=null && this.widgetFields[name])
            return this;
        // params and variables have precedence over members
        // so first look in context values
        const context = super.contextForValue(name);
        if(context !== null) {
            return context;
        }
        const decl = this.getDeclaration();
        if(decl.hasAttribute(this, name) || decl.hasMethod(this, name)) {
            return this;
        } else {
            return null;
        }
    }

    getDeclaration() {
        if(this.instance !== null)
            return this.instance.declaration;
        else
            return this.getTypedDeclaration(CategoryDeclaration, this.instanceType.name);
    }

    readValue(id) {
        const decl = this.getDeclaration();
        if(decl.hasAttribute(this, id.name)) {
            return this.instance.getMemberValue(this.calling, id.name);
        } else if(decl.hasMethod(this, id.name)) {
            const method = decl.getMemberMethodsMap(this, id.name).getFirst();
            return new ClosureValue(this, new MethodType(method));
        } else
            return null;
    }

    writeValue(id, value) {
        this.instance.setMember(this.calling, id.name, value);
    }
}

class BuiltInContext extends Context {

    constructor(value) {
        super();
        this.value = value;
    }
}

class DocumentContext extends Context {

    constructor(document) {
        super();
        this.document = document;
    }

    contextForValue(name) {
        // params and variables have precedence over members
        // so first look in context values
        const context = super.contextForValue(name);
        if (context !== null)
            return context;
        // since any name is valid in the context of a document
        // simply return this document context
        else
            return this;
    }

    readValue(name) {
        return this.document.getMemberValue(this.calling, name);
    }

    writeValue(id, value) {
        this.document.setMember(this.calling, id, value);
    }
}


export {Context, BuiltInContext, InstanceContext, DocumentContext, ResourceContext};