var SingletonCategoryDeclaration = null;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var MemberSelector = require("./MemberSelector").MemberSelector;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var Identifier = require("../grammar/Identifier").Identifier;
var UnresolvedIdentifier = null;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var NullValue = require("../value/NullValue").NullValue;
var TypeValue = require("../value/TypeValue").TypeValue;
var InstanceContext = null;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var NativeInstance = null;
var CategoryType = null;
var MethodDeclarationMap = null;


exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
    InstanceContext = require("../runtime/Context").InstanceContext;
    NativeInstance = require("../value/NativeInstance.js").NativeInstance;
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
    SingletonCategoryDeclaration = require("../declaration/SingletonCategoryDeclaration.js").SingletonCategoryDeclaration;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
};

function MethodSelector(parent, id) {
	MemberSelector.call(this, parent, id);
	return this;
}

MethodSelector.prototype = Object.create(MemberSelector.prototype);
MethodSelector.prototype.constructor = MethodSelector;

MethodSelector.prototype.toDialect = function(writer) {
    if(this.parent==null)
        writer.append(this.name);
    else
        MemberSelector.prototype.parentAndMemberToDialect.call(this, writer);
};

MethodSelector.prototype.newFullSelector = function(counter){
    var name = this.id.name + "$" + counter;
    return new MethodSelector(this.parent, new Identifier(name));
};

MethodSelector.prototype.transpile = function(transpiler) {
    if(this.parent!=null)
        MemberSelector.prototype.transpile.call(this, transpiler);
    else
        transpiler.append(this.name);
};


MethodSelector.prototype.toString = function() {
	if(this.parent==null) {
		return this.name;
	} else {
		return MemberSelector.prototype.toString.call(this) + "." + this.name;
	}
};

MethodSelector.prototype.getCandidates = function(context, checkInstance) {
	if(this.parent===null) {
		return this.getGlobalCandidates(context);
	} else {
		return this.getMemberCandidates(context, checkInstance);
	}
};

MethodSelector.prototype.getGlobalCandidates = function(context) {
    var result = new Set();
    // if called from a member method, could be a member method called without this/self
    var instance = context.getClosestInstanceContext();
    if(instance!=null) {
        var type = instance.instanceType;
        var cd = context.getRegisteredDeclaration(type.name);
        if(cd!=null) {
            var members = cd.getMemberMethodsMap(context, this.name);
            if(members!=null) {
                members.getAll().forEach(function(method) {
                    result.add(method);
                });
            }
        }
    }
    var methods = context.getRegisteredDeclaration(this.name);
    if(methods instanceof MethodDeclarationMap) {
        methods.getAll().forEach(function(method) {
            result.add(method);
        });
    }
    return result;
};


MethodSelector.prototype.getMemberCandidates = function(context, checkInstance) {
    var parentType = this.checkParentType(context, checkInstance);
    var methods = parentType.getMemberMethods(context, this.name);
    return new Set(methods);
};



MethodSelector.prototype.checkParentType = function(context, checkInstance) {
    if(checkInstance)
        return this.checkParentInstance(context);
    else
        return this.checkParent(context);
};



MethodSelector.prototype.checkParentInstance = function(context) {
    var id = null;
    if(this.parent instanceof UnresolvedIdentifier)
        id = this.parent.id;
    else if(this.parent instanceof InstanceExpression)
        id = this.parent.id;
    if(id!=null) {
        // don't get Singleton values
        var first = id.name.substring(0, 1);
        if(first.toLowerCase()==first) {
            var value = context.getValue(id);
            if(value!=null && value!=NullValue.instance)
                return value.type;
        }
    }
    // TODO check result instance
    return this.checkParent(context);
};


MethodSelector.prototype.getCategoryCandidates = function(context) {
	var parentType = this.checkParent(context);
	if(!(parentType instanceof CategoryType)) {
		throw new SyntaxError(parent.toString() + " is not a category");
	}
	var cd = context.getRegisteredDeclaration(parentType.name);
	if(cd===null) {
		throw new SyntaxError("Unknown category:" + parentType.name);
	}
	return cd.getMemberMethods(context, this.name);
};

MethodSelector.prototype.newLocalContext = function(context, decl) {
	if(this.parent!=null) {
        return this.newInstanceContext(context);
    } else if(decl.memberOf!=null) {
        return this.newLocalInstanceContext(context);
    } else {
        return context.newLocalContext();
	}
};

MethodSelector.prototype.newLocalInstanceContext = function(context) {
    var instance = context.getClosestInstanceContext();
    if(instance==null)
        throw new SyntaxError("Not in instance context !");
    context = instance.newLocalContext();
    context.parent = instance; // make local context child of the existing instance
    return context;
};


MethodSelector.prototype.newLocalCheckContext = function(context, decl) {
    if (this.parent != null) {
        return this.newInstanceCheckContext(context);
    } else if(decl.memberOf!=null) {
        return this.newLocalInstanceContext(context);
    } else {
        return context.newLocalContext();
    }
};

MethodSelector.prototype.newInstanceCheckContext = function(context) {
    var type = this.parent.check (context);
    if (type instanceof CategoryType) {
        var decl = context.getRegisteredDeclaration(type.name);
        context = context.newInstanceContext(null, type, decl instanceof SingletonCategoryDeclaration);
        return context.newChildContext();
    } else
        return context.newChildContext();
};


MethodSelector.prototype.newInstanceContext = function(context) {
	var value = this.parent.interpret(context);
	if(value==null || value==NullValue.instance) {
		throw new NullReferenceError();
	}
    if(value instanceof TypeValue && value.value instanceof CategoryType)
        value = context.loadSingleton(value.value);
	if(value instanceof ConcreteInstance || value instanceof NativeInstance) {
        context = context.newInstanceContext(value, null);
        return context.newChildContext();
    } else {
        context = context.newBuiltInContext(value);
        return context.newChildContext();

    }
};



exports.MethodSelector = MethodSelector;

