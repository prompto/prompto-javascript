var ConcreteCategoryDeclaration = require("../declaration/ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var BaseMethodDeclaration = require("../declaration/BaseMethodDeclaration").BaseMethodDeclaration;
var TestMethodDeclaration = require("../declaration/TestMethodDeclaration").TestMethodDeclaration;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var MethodExpression = require("../expression/MethodExpression").MethodExpression;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var ExpressionValue = require("../value/ExpressionValue").ExpressionValue;
var ProblemListener = require("../problem/ProblemListener").ProblemListener;
var DecimalType = require("../type/DecimalType").DecimalType;
var Decimal = require("../value/Decimal").Decimal;
var Integer = require("../value/Integer").Integer;
var Variable = require("./Variable").Variable;
var LinkedValue = require("./LinkedValue").LinkedValue;

function Context() {
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
	return this;
}

Context.newGlobalContext = function() {
	var context = new Context();
	context.globals = context;
	context.calling = null;
	context.parent = null;
	context.debugger = null;
	return context;
};


Context.prototype.isGlobalContext = function() {
	return this===this.globals;
};

/*

public void setDebugger(Debugger debugger) {
	this.debugger = debugger;
}

public Debugger getDebugger() {
	return debugger;
}

@Override
public String toString() {
	StringBuilder sb = new StringBuilder();
	sb.append("{");
	if(this!=globals) {
		sb.append("globals:");
		sb.append(globals);
	}
	sb.append(",calling:");
	sb.append(calling);
	sb.append(",parent:");
	sb.append(parent);
	sb.append(",declarations:");
	sb.append(declarations);
	sb.append(",instances:");
	sb.append(instances);
	sb.append(",values:");
	sb.append(values);
	sb.append("}");
	return sb.toString();
}

*/

Context.prototype.getCallingContext = function() {
	return this.calling;
};

Context.prototype.getParentMostContext = function() {
	if(this.parent==null) {
		return this;
	} else {
		return this.parent.getParentMostContext();
	}
};

Context.prototype.getParentContext = function() {
	return this.parent;
}

Context.prototype.setParentContext = function(parent) {
	this.parent = parent;
}

Context.prototype.newResourceContext = function() {
	var context = new ResourceContext();
	context.globals = this.globals;
	context.calling = this.calling;
	context.parent = this;
	context.debugger = this.debugger;
    context.problemListener = this.problemListener;
    return context;
};

Context.prototype.newLocalContext = function() {
	var context = new Context();
	context.globals = this.globals;
	context.calling = this;
	context.parent = null;
	context.debugger = this.debugger;
    context.problemListener = this.problemListener;
	return context;
};

Context.prototype.newDocumentContext = function(doc, isChild) {
	var context = new DocumentContext(doc);
	context.globals = this.globals;
	context.calling = isChild ? this.calling : this;
	context.parent = isChild ? this : null;
	context.debugger = this.debugger;
    context.problemListener = this.problemListener;
	return context;
};


Context.prototype.newInstanceContext = function(instance, type) {
    var context = new InstanceContext(instance, type);
    context.globals = this.globals;
    context.calling = this;
    context.parent = null;
    context.debugger = this.debugger;
    context.problemListener = this.problemListener;
    return context;
};

Context.prototype.newChildContext = function() {
	var context = new Context();
	context.globals = this.globals;
	context.calling = this.calling;
	context.parent = this;
	context.debugger = this.debugger;
    context.problemListener = this.problemListener;
	return context;
};

Context.prototype.getCatalog = function() {
    if (this != this.globals)
        return this.globals.getCatalog();
    else
        return this.getLocalCatalog();
};

Context.prototype.getLocalCatalog = function() {
    var catalog = { attributes : [], methods : [], categories : [], tests : []};
    for(var name in this.declarations) {
        var decl = this.declarations[name];
        if(decl instanceof AttributeDeclaration)
            catalog.attributes.push(name);
        else if(decl instanceof CategoryDeclaration)
            catalog.categories.push(name);
        else if(decl instanceof MethodDeclarationMap) {
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
    for(var name in this.tests)
        catalog.tests.push(name);
    // minimize for UI optimization
    if(!catalog.attributes.length)
        delete catalog.attributes;
    if(!catalog.methods.length)
        delete catalog.methods;
    if(!catalog.categories.length)
        delete catalog.categories;
    if(!catalog.tests.length)
        delete catalog.tests;
    return catalog;
};

Context.prototype.findAttribute = function(name) {
    if(this==this.globals)
        return this.declarations[name] || null;
    else
        return this.globals.findAttribute(name);
};

Context.prototype.getAllAttributes = function() {
    if(this==this.globals) {
        var list = [];
        for(var name in this.declarations) {
            if(this.declarations[name] instanceof AttributeDeclaration)
                list.push(this.declarations[name]);
        }
        return list;
    } else
        return this.globals.getAllAttributes();
};

Context.prototype.getRegistered = function(name) {
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
};

Context.prototype.getRegisteredDeclaration = function(name) {
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

Context.prototype.registerDeclaration = function(declaration) {
    if(this.checkDuplicate(declaration))
    	this.declarations[declaration.name] = declaration;
};

Context.prototype.checkDuplicate = function(declaration) {
    var actual = this.getRegistered(declaration.name) || null;
    if (actual != null)
        this.problemListener.reportDuplicate(declaration.name, declaration);
    return actual == null;
}


Context.prototype.unregisterTestDeclaration = function(declaration) {
    delete this.tests[declaration.name];
};

Context.prototype.unregisterMethodDeclaration = function(declaration, proto) {
    var map = this.declarations[declaration.name];
    if(map && map.unregister(proto))
        delete this.declarations[declaration.name];
};

Context.prototype.unregisterDeclaration = function(declaration) {
    delete this.declarations[declaration.name];
};

Context.prototype.registerMethodDeclaration = function(declaration) {
    var actual = this.checkDuplicateMethod(declaration);
    if (actual === null) {
        actual = new MethodDeclarationMap(declaration.name);
        this.declarations[declaration.name] = actual;
    }
    actual.register(declaration, this);
};

Context.prototype.checkDuplicateMethod = function(declaration) {
    var actual = this.getRegistered(declaration.name) || null;
    if (actual !== null && !(actual instanceof MethodDeclarationMap))
        this.problemListener.reportDuplicate(declaration.name, declaration);
    return actual;
};

Context.prototype.registerTestDeclaration = function(declaration) {
    var actual = this.tests[declaration.name] || null;
    if(actual!==null)
        this.problemListener.reportDuplicate(declaration.name, declaration);
    this.tests[declaration.name] = declaration;
};

Context.prototype.getRegisteredTest = function(name) {
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
};

Context.prototype.hasTests = function() {
    for(var test in this.tests)
        return true;
    return false;
};

Context.prototype.registerNativeBinding = function(type, declaration) {
    if(this==this.globals)
        this.nativeBindings[type] = declaration;
    else
        this.globals.registerNativeBinding(type, declaration);
};

Context.prototype.getNativeBinding = function(type) {
    if(this==this.globals)
        return this.nativeBindings[type] || null;
    else
        return this.globals.getNativeBinding(type);
};

function MethodDeclarationMap(name) {
	this.name = name;
	this.protos = {};
	return this;
}

MethodDeclarationMap.prototype.register = function(declaration, context) {
	var proto = declaration.getProto(context);
	var current = this.protos[proto] || null;
	if(current!==null)
        context.problemListener.reportDuplicate(declaration.name, declaration);
	this.protos[proto] = declaration;
};

MethodDeclarationMap.prototype.unregister = function(proto) {
    delete this.protos[proto];
    return Object.getOwnPropertyNames(this.protos).length == 0;
};

MethodDeclarationMap.prototype.registerIfMissing = function(declaration,context) {
	var proto = declaration.getProto(context);
	if(!(proto in this.protos)) {
		this.protos[proto] = declaration;
	}
};


Context.prototype.getRegisteredValue = function(name) {
    var context = this.contextForValue(name);
    if (context == null)
        return null;
    else
        return context.readRegisteredValue(name);
};

Context.prototype.readRegisteredValue = function(name) {
	return this.instances[name] || null;
};


Context.prototype.registerValue = function(value, checkDuplicate) {
    if(checkDuplicate === undefined)
        checkDuplicate = true;
	if(checkDuplicate) {
        // only explore current context
        var actual = this.instances[value.name] || null;
        if(actual!==null)
            this.problemListener.reportDuplicateVariable(value.id);
    }
	this.instances[value.name] = value;
}

Context.prototype.getValue = function(id) {
	var context = this.contextForValue(id.name);
	if(context===null)
        this.problemListener.reportUnknownVariable(id);
	return context.readValue(id);
};

Context.prototype.readValue = function(id) {
	var value = this.values[id.name] || null;
	if(value===null)
        this.problemListener.reportEmptyVariable(id);
    if(value instanceof LinkedValue)
        return value.context.getValue(id);
    else
        return value;
};

Context.prototype.setValue = function(id, value) {
	var context = this.contextForValue(id.name);
	if(context===null)
        this.problemListener.reportUnknownVariable(id);
	context.writeValue(id, value);
};


Context.prototype.writeValue = function(id, value) {
    value = this.autocast(id.name, value);
    var current = this.values[id.name];
    if(current instanceof LinkedValue)
        current.context.setValue(id, value);
    else
    	this.values[id.name] = value;
};

Context.prototype.autocast = function(name, value) {
    if(value!=null && value instanceof Integer) {
        var actual = this.instances[name];
        if(actual.getType(this)==DecimalType.instance)
            value = new Decimal(value.DecimalValue());
    }
    return value;
};

Context.prototype.contextForValue = function(name) {
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
};

Context.prototype.contextForDeclaration = function(name) {
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
};

function ResourceContext() {
	Context.call(this);
	return this;
}

ResourceContext.prototype = Object.create(Context.prototype);
ResourceContext.prototype.constructor = ResourceContext;

function InstanceContext(instance, type) {
	Context.call(this);
	this.instance = instance || null;
    this.instanceType = type!=null ? type : instance.type;
	return this;
}

InstanceContext.prototype = Object.create(Context.prototype);
InstanceContext.prototype.constructor = InstanceContext;


InstanceContext.prototype.readRegisteredValue = function(name) {
    var actual = this.instances[name];
    // not very pure, but avoids a lot of complexity when registering a value
    if(actual==null) {
        var attr = this.getRegisteredDeclaration(name);
        var type = attr.getType();
        actual = new Variable(name, type);
        this.instances[name] = actual;
    }
    return actual;
};


InstanceContext.prototype.contextForValue = function(name) {
	// params and variables have precedence over members
	// so first look in context values
	var context = Context.prototype.contextForValue.call(this, name);
	if(context!=null) {
		return context;
	} else if(this.getDeclaration().hasAttribute(this, name)) {
		return this;
	} else {
		return null;
	}
};

InstanceContext.prototype.getDeclaration = function() {
    if(this.instance!=null)
        return this.instance.declaration;
    else
        return this.getRegisteredDeclaration(this.instanceType.name);
};

InstanceContext.prototype.readValue = function(name) {
	return this.instance.getMember(this.calling, name);
};

InstanceContext.prototype.writeValue = function(name, value) {
	this.instance.setMember(this.calling, name, value);
};


function DocumentContext(document) {
    Context.call(this);
    this.document = document;
    return this;
}

DocumentContext.prototype = Object.create(Context.prototype);
DocumentContext.prototype.constructor = DocumentContext;


DocumentContext.prototype.contextForValue = function(name) {
    // params and variables have precedence over members
    // so first look in context values
    var context = Context.prototype.contextForValue.call(this, name);
    if (context != null)
        return context;
    // since any name is valid in the context of a document
    // simply return this document context
    else
        return this;
};

DocumentContext.prototype.readValue = function(name) {
    return this.document.getMember(this.calling, name);
};


DocumentContext.prototype.writeValue = function(name) {
    this.document.setMember(this.calling, name, value);
};


Context.prototype.enterMethod = function(method) {
	if(this.debugger!=null) {
		this.debugger.enterMethod(this, method);
	}
};

Context.prototype.leaveMethod = function(method) {
	if(this.debugger!=null) {
		this.debugger.leaveMethod(this, method);
	}
};

Context.prototype.enterStatement = function(statement) {
	if(this.debugger!=null) {
		this.debugger.enterStatement(this, statement);
	}
};

Context.prototype.leaveStatement = function(statement) {
	if(this.debugger!=null) {
		this.debugger.leaveStatement(this, statement);
	}
};

Context.prototype.terminated = function() {
	if (this.debugger != null) {
		this.debugger.terminated();
	}
};

Context.prototype.loadSingleton = function(type) {
    if(this==this.globals) {
        var value = this.values[type.name] || null;
        if(value==null) {
            var decl = this.declarations[type.name] || null;
            if(!(decl instanceof ConcreteCategoryDeclaration))
                throw new InternalError("No such singleton:" + type.name);
            value = new ConcreteInstance(decl);
            value.mutable = true; // a singleton is protected by "with x do", so always mutable in that context
            this.values[type.name] = value;
        }
        if(value instanceof ConcreteInstance)
            return value;
        else
            throw new InternalError("Not a concrete instance:" + value);
    } else
        return this.globals.loadSingleton(type);
};


exports.Context = Context;
exports.InstanceContext = InstanceContext;
exports.ResourceContext = ResourceContext;
exports.MethodDeclarationMap = MethodDeclarationMap;