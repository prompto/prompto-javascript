var EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
var EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
var ConcreteCategoryDeclaration = require("../declaration/ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var ProblemListener = require("../problem/ProblemListener").ProblemListener;
var ProblemCollector = require("../problem/ProblemCollector").ProblemCollector;
var MethodType = require("../type/MethodType").MethodType;
var DecimalType = require("../type/DecimalType").DecimalType;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var Variable = require("./Variable").Variable;
var WidgetField = require("./WidgetField").WidgetField;
var LinkedValue = require("./LinkedValue").LinkedValue;
var InternalError = require("../error/InternalError").InternalError;

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
        var context = new Context();
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
        var context = new ResourceContext();
        context.globals = this.globals;
        context.calling = this.calling;
        context.parent = this;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newLocalContext() {
        var context = new Context();
        context.globals = this.globals;
        context.calling = this;
        context.parent = null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newDocumentContext(doc, isChild) {
        var context = new DocumentContext(doc);
        context.globals = this.globals;
        context.calling = isChild ? this.calling : this;
        context.parent = isChild ? this : null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newBuiltInContext(value) {
        var context = new BuiltInContext(value);
        context.globals = this.globals;
        context.calling = this;
        context.parent = null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        return context;
    }

    newInstanceContext(instance, type, isChild) {
        var context = new InstanceContext(instance, type);
        context.globals = this.globals;
        context.calling = isChild ? this.calling : this;
        context.parent = isChild ? this : null;
        context.debugger = this.debugger;
        context.problemListener = this.problemListener;
        var decl = context.getDeclaration();
        if(decl)
            decl.processAnnotations(context, true);
        return context;
    }

    newChildContext() {
        var context = new Context();
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
        var context = new Context();
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
        var catalog = { attributes : [], methods : [], categories : [], enumerations : [], tests : [], widgets: []};
        for(var name in this.declarations) {
            var decl = this.declarations[name];
            if(decl instanceof AttributeDeclaration)
                catalog.attributes.push(name);
            else if(decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration) {
                var info = {};
                info.name = decl.name;
                info.symbols = decl.symbols.map(function (s) {
                    return s.name;
                });
                catalog.enumerations.push(info);
            } else if(decl instanceof CategoryDeclaration) {
                if(decl.isWidget(this))
                    catalog.widgets.push(name);
                else
                    catalog.categories.push(name);
            } else if(decl instanceof MethodDeclarationMap) {
                var method = {};
                method.name = decl.name;
                method.protos = [];
                for (var proto in decl.protos) {
                    var main = decl.protos[proto].isEligibleAsMain();
                    method.protos.push({proto: proto, main: main});
                }
                catalog.methods.push(method);
            }
        }
        for(name in this.tests)
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
            var list = [];
            for(var name in this.declarations) {
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
        var actual = this.declarations[name] || null;
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
        var actual = this.declarations[name] || null;
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
        var decl = this.getRegisteredDeclaration(name);
        if(decl==null || !klass.prototype.isPrototypeOf(decl))
            return null;
        else
            return decl;
    }

    getLocalDeclaration(name) {
        var actual = this.declarations[name] || null;
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
        var actual = this.getRegistered(declaration.name) || null;
        if (actual !== null && actual !== declaration)
            this.problemListener.reportDuplicate(declaration.id);
        return actual === null;
    }

    unregisterTestDeclaration(declaration) {
        delete this.tests[declaration.name];
    }

    unregisterMethodDeclaration(declaration, proto) {
        var map = this.declarations[declaration.name];
        if(map && map.unregister(proto))
            delete this.declarations[declaration.name];
    }

    unregisterDeclaration(declaration) {
        delete this.declarations[declaration.name];
    }

    registerMethodDeclaration(declaration) {
        var actual = this.checkDuplicateMethod(declaration);
        if (actual === null) {
            actual = new MethodDeclarationMap(declaration.name);
            this.declarations[declaration.name] = actual;
        }
        actual.register(declaration, this.problemListener);
    }

    checkDuplicateMethod(declaration) {
        var actual = this.getRegistered(declaration.name) || null;
        if (actual !== null && !(actual instanceof MethodDeclarationMap))
            this.problemListener.reportDuplicate(declaration.id);
        return actual;
    }

    registerTestDeclaration(declaration) {
        var actual = this.tests[declaration.name] || null;
        if(actual!==null)
            this.problemListener.reportDuplicate(declaration.id);
        this.tests[declaration.name] = declaration;
    }

    getRegisteredTest(name) {
        // resolve upwards, since local names override global ones
        var actual = this.tests[name] || null;
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
        for(var test in this.tests)
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
            var binding = this.nativeBindings[type] || null;
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
        var context = this.contextForValue(name);
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
            var actual = this.instances[value.name] || null;
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
        var context = this.contextForValue(id.name);
        if(context===null)
            this.problemListener.reportUnknownVariable(id);
        return context.readValue(id);
    }

    readValue(id) {
        var value = this.values[id.name] || null;
        if(value===null)
            this.problemListener.reportEmptyVariable(id);
        if(value instanceof LinkedValue)
            return value.context.getValue(id);
        else
            return value;
    }

    setValue(id, value) {
        var context = this.contextForValue(id.name);
        if(context===null)
            this.problemListener.reportUnknownVariable(id);
        context.writeValue(id, value);
    }

    writeValue(id, value) {
        value = this.autocast(id.name, value);
        var current = this.values[id.name];
        if(current instanceof LinkedValue)
            current.context.setValue(id, value);
        else
            this.values[id.name] = value;
    }

    autocast(name, value) {
        if(value !== null && value instanceof IntegerValue) {
            var actual = this.instances[name];
            if(actual.getType(this) === DecimalType.instance)
                value = new DecimalValue(value.DecimalValue());
        }
        return value;
    }

    contextForValue(name) {
        // resolve upwards, since local names override global ones
        var actual = this.instances[name] || null;
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
        var actual = this.declarations[name] || null;
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
            var value = this.values[type.name] || null;
            if(value === null) {
                var decl = this.declarations[type.name] || null;
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

class MethodDeclarationMap {
    constructor(name) {
        this.name = name;
        this.protos = {};
        return this;
    }

    register(declaration, problemListener) {
        var proto = declaration.getProto();
        var current = this.protos[proto] || null;
        if(current!==null)
            problemListener.reportDuplicate(declaration.id);
        this.protos[proto] = declaration;
    }

    unregister(proto) {
        delete this.protos[proto];
        return Object.getOwnPropertyNames(this.protos).length === 0;
    }

    hasProto(proto) {
        return !!this.protos[proto];
    }

    registerIfMissing(declaration) {
        var proto = declaration.getProto();
        if(!(proto in this.protos)) {
            this.protos[proto] = declaration;
        }
    }

    getFirst() {
        for(var proto in this.protos) {
            return this.protos[proto];
        }
    }

    getAll() {
        return Object.getOwnPropertyNames(this.protos).map(function(proto) { return this.protos[proto]; }, this);
    }

    isEmpty() {
        return this.size()===0;
    }

    size() {
        return Object.getOwnPropertyNames(this.protos).length;
    }
}

class ResourceContext extends Context {
    constructor() {
        super();
        return this;
    }
}

class InstanceContext extends Context {
    constructor(instance, type) {
        super();
        this.instance = instance || null;
        this.instanceType = type !== null ? type : instance.type;
        this.widgetFields = null;
        return this;
    }

    getClosestInstanceContext() {
        return this;
    }

    getRegistered(name) {
        if(this.widgetFields) {
            var field = this.widgetFields[name];
            if(field)
                return field;
        }
        var actual = Context.prototype.getRegistered.call(this, name);
        if (actual)
            return actual;
        var decl = this.getDeclaration();
        if (decl==null)
            return null;
        var methods = decl.getMemberMethodsMap(this, name);
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
        var widgetField = this.widgetFields[id.name];
        if(widgetField) {
            // we control reentrance by registering which processor created the widgetField
            if(widgetField.createdBy == createdBy)
                return;
            this.getProblemListener().reportDuplicate(id);
        } else
            this.widgetFields[id.name] = new WidgetField(id.name, type, createdBy);
    }

    overrideWidgetFieldType(id, type, updatedBy) {
        var widgetField = this.widgetFields ? this.widgetFields[id.name] : null;
        if(widgetField) {
            widgetField.type = type;
            widgetField.updatedBy = updatedBy;
        } else
            this.problemListener.reportUnknownIdentifier(id, id.name);
    }

    getTypedDeclaration(klass, name) {
        if (klass === MethodDeclarationMap) {
            var decl = this.getDeclaration();
            if (decl) {
                var methods = decl.getMemberMethodsMap(this, name);
                if (methods && !methods.isEmpty())
                    return methods;
            }
        }
        return Context.prototype.getTypedDeclaration.call(this, klass, name)
    }

    readRegisteredValue(name) {
        var actual = this.instances[name] || null;
        // not very pure, but avoids a lot of complexity when registering a value
        if(actual === null) {
            var attr = this.getRegisteredDeclaration(name);
            if(attr instanceof AttributeDeclaration) {
                var type = attr.getType();
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
        var context = Context.prototype.contextForValue.call(this, name);
        if(context !== null) {
            return context;
        }
        var decl = this.getDeclaration();
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
        var decl = this.getDeclaration();
        if(decl.hasAttribute(this, id.name)) {
            return this.instance.getMemberValue(this.calling, id.name);
        } else if(decl.hasMethod(this, id.name)) {
            var method = decl.getMemberMethodsMap(this, id.name).getFirst()
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
        return this;
    }
}

class DocumentContext extends Context {
    constructor(document) {
        super();
        this.document = document;
        return this;
    }

    contextForValue(name) {
        // params and variables have precedence over members
        // so first look in context values
        var context = Context.prototype.contextForValue.call(this, name);
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


exports.Context = Context;
exports.BuiltInContext = BuiltInContext;
exports.InstanceContext = InstanceContext;
exports.DocumentContext = DocumentContext;
exports.ResourceContext = ResourceContext;
exports.MethodDeclarationMap = MethodDeclarationMap;