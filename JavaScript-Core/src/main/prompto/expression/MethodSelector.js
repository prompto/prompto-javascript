var MemberSelector = require("./MemberSelector").MemberSelector;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var NullValue = require("../value/NullValue").NullValue;
var TypeValue = require("../value/TypeValue").TypeValue;
var InstanceContext = null;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var CategoryType = null;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
    InstanceContext = require("../runtime/Context").InstanceContext;
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
        MemberSelector.prototype.toDialect.call(this, writer);
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
    var methods = []
    // if called from a member method, could be a member method called without this/self
    if(context.parent instanceof InstanceContext) {
        var type = context.parent.instanceType;
        var cd = context.getRegisteredDeclaration(type.name);
        if(cd!=null) {
            var members = cd.getMemberMethods(context, this.name);
            if(members!=null) {
                Object.keys(members).forEach(function (key) {
                    methods.push(members[key])
                });
            }
        }
    }
    var methodsMap = context.getRegisteredDeclaration(this.name);
    if(methodsMap!=null && methodsMap.protos != null)
        Object.keys(methodsMap.protos).forEach(function (proto) {
                methods.push(methodsMap.protos[proto])
            });
    return methods;
};


MethodSelector.prototype.getMemberCandidates = function(context, checkInstance) {
    var parentType = this.checkParentType(context, checkInstance);
    return parentType.getMemberMethods(context, this.name);
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
    var parent = context.parent;
    if(!(parent instanceof InstanceContext))
        throw new SyntaxError("Not in instance context !");
    context = context.newLocalContext();
    context.parent = parent; // make local context child of the existing instance
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
        context = context.newInstanceContext(null, type);
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
	if(value instanceof ConcreteInstance) {
        context = context.newInstanceContext(value, null);
        return context.newChildContext();
    } else {
        context = context.newBuiltInContext(value);
        return context.newChildContext();

    }
};



exports.MethodSelector = MethodSelector;

