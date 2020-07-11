var Expression = require("./Expression").Expression;
var MethodCall = require("../statement/MethodCall").MethodCall;
var EnumeratedCategoryDeclaration = null;
var CategoryDeclaration = null;
var EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
var ConstructorExpression = null;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var SymbolExpression = require("./SymbolExpression").SymbolExpression;
var TypeExpression = require("./TypeExpression").TypeExpression;
var ProblemListener = require("../problem/ProblemListener").ProblemListener;
var PromptoError = require("../error/PromptoError").PromptoError;
var Dialect = require("../parser/Dialect").Dialect;
var NativeType = require("../type/NativeType").NativeType;
var VoidType = require("../type/VoidType").VoidType;
var EnumeratedCategoryType = null;
var CategoryType = null;
var MethodSelector = null;

exports.resolve = function() {
    EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
    EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
    MethodSelector = require("./MethodSelector").MethodSelector;
    CategoryType = require("../type/CategoryType").CategoryType;
    CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
    ConstructorExpression = require("./ConstructorExpression").ConstructorExpression;
}

function UnresolvedIdentifier(id) {
    Expression.call(this);
    this.id = id;
    this.resolved = null;
    return this;
}

UnresolvedIdentifier.prototype = Object.create(Expression.prototype);
UnresolvedIdentifier.prototype.constructor = UnresolvedIdentifier;

Object.defineProperty(UnresolvedIdentifier.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

UnresolvedIdentifier.prototype.toString = function() {
    return this.id.name;
};


UnresolvedIdentifier.prototype.toDialect = function(writer) {
    try {
        this.resolve(writer.context, false, false);
    } catch(e) {
        /* eslint no-empty: [ "off" ] */
    }
    if(this.resolved!=null)
        this.resolved.toDialect(writer);
    else
        writer.append(this.id.name);
};

UnresolvedIdentifier.prototype.check = function(context) {
    return this.resolveAndCheck(context, false);
};


UnresolvedIdentifier.prototype.checkAttribute = function(context) {
    var decl = context.findAttribute(this.name);
    return decl ? decl : Expression.prototype.checkAttribute.call(this, context);
};


UnresolvedIdentifier.prototype.checkQuery = function(context) {
    return this.check(context);
};


UnresolvedIdentifier.prototype.checkMember = function(context) {
    return this.resolveAndCheck(context, true);
};


UnresolvedIdentifier.prototype.interpret = function(context) {
    if(this.resolved==null) {
        this.resolveAndCheck(context, false);
    }
    return this.resolved.interpret(context);
};


UnresolvedIdentifier.prototype.interpretQuery = function(context, builder) {
    if(this.resolved==null) {
        this.resolveAndCheck(context, false);
    }
    this.resolved.interpretQuery(context, builder);
};


UnresolvedIdentifier.prototype.declareQuery = function(transpiler) {
    if(this.resolved==null) {
        this.resolveAndCheck(transpiler.context, false);
    }
    this.resolved && this.resolved.declareQuery(transpiler);
};


UnresolvedIdentifier.prototype.transpileQuery = function(transpiler, builderName) {
    if(this.resolved==null) {
        this.resolveAndCheck(transpiler.context, false);
    }
    this.resolved && this.resolved.transpileQuery(transpiler, builderName);
};


UnresolvedIdentifier.prototype.resolveAndCheck = function(context, forMember) {
    this.resolve(context, forMember);
    return this.resolved ? this.resolved.check(context) : VoidType.instance;
};


UnresolvedIdentifier.prototype.resolve = function(context, forMember, updateSelectorParent) {
    if(updateSelectorParent)
        this.resolved = null;
    if(this.resolved==null) {
        // ignore resolution problems during resolution
        var listener = context.problemListener;
        try {
            context.problemListener = new ProblemListener();
            this.resolved = this.doResolve(context, forMember, updateSelectorParent);
        } finally {
            // restore listener
            context.problemListener = listener;
        }
    }
    if(this.resolved==null)
        context.problemListener.reportUnknownIdentifier(this.id);
    return this.resolved;
};


UnresolvedIdentifier.prototype.doResolve = function(context, forMember, updateSelectorParent) {
    var resolved = this.resolveSymbol(context);
    if(resolved)
        return resolved;
    resolved = this.resolveTypeOrConstructor(context, forMember);
    if(resolved)
        return resolved;
    resolved = this.resolveMethodCall(context, updateSelectorParent);
    if(resolved)
        return resolved;
    resolved = this.resolveInstance(context);
    return resolved;
};


UnresolvedIdentifier.prototype.resolveTypeOrConstructor = function(context, forMember) {
    // is first char uppercase?
    if (this.id.name[0].toUpperCase() != this.id.name[0])
        return null;
    if (forMember) {
        return this.resolveType(context);
    } else {
        return this.resolveConstructor(context);
    }
};


UnresolvedIdentifier.prototype.resolveInstance = function(context) {
    try {
        var id = new InstanceExpression(this.id);
        id.check(context);
        return id;
    } catch(e) {
        if(e instanceof PromptoError) {
            return null;
        } else {
            throw e;
        }
    }
};

UnresolvedIdentifier.prototype.resolveMethodCall = function(context, updateSelectorParent) {
    if(this.id.dialect!=Dialect.E)
        return null;
    try {
        var selector = new MethodSelector(null, this.id);
        var call = new MethodCall(selector);
        call.check(context, updateSelectorParent);
        return call;
    } catch(e) {
        if(e instanceof PromptoError) {
            return null;
        } else {
            throw e;
        }
    }
};

UnresolvedIdentifier.prototype.resolveConstructor = function(context) {
    try {
        var method = new ConstructorExpression(new CategoryType(this.id), null, null, true);
        method.check(context);
        return method;
    } catch(e) {
        if(e instanceof PromptoError) {
            return null;
        } else {
            throw e;
        }
    }
};

UnresolvedIdentifier.prototype.resolveType = function(context) {
    var decl = context.getRegisteredDeclaration(this.name);
    if(decl instanceof EnumeratedCategoryDeclaration) {
        return new TypeExpression(new EnumeratedCategoryType(this.id));
    } else if(decl instanceof CategoryDeclaration) {
        return new TypeExpression(new CategoryType(this.id));
    } else if(decl instanceof EnumeratedNativeDeclaration) {
        return new TypeExpression(decl.getType(context));
    } else {
        var allTypes = NativeType.getAll();
        for(var i=0;i<allTypes.length;i++) {
            if (this.name == allTypes[i].name) {
                return new TypeExpression(allTypes[i]);
            }
        }
    }
    return null;
};

UnresolvedIdentifier.prototype.resolveSymbol = function(context) {
    if(this.id.name==this.id.name.toUpperCase()) {
        return new SymbolExpression(this.id);
    } else {
        return null;
    }
};

UnresolvedIdentifier.prototype.declare = function(transpiler) {
    this.resolve(transpiler.context, false, true);
    this.resolved.declare(transpiler);
};

UnresolvedIdentifier.prototype.transpile = function(transpiler) {
    this.resolve(transpiler.context, false, true);
    this.resolved.transpile(transpiler);
};


exports.UnresolvedIdentifier = UnresolvedIdentifier;

