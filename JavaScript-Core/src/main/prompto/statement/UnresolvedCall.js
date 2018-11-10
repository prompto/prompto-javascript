var BaseStatement = require("./BaseStatement").BaseStatement;
var UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
var MethodCall = require("./MethodCall").MethodCall;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var MethodExpression = require("../expression/MethodExpression").MethodExpression;
var MethodArgument = require("../argument/MethodArgument").MethodArgument;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
var CategoryType = require("../type/CategoryType").CategoryType;
var MethodType = require("../type/MethodType").MethodType;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var InstanceContext = require("../runtime/Context").InstanceContext;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;


function UnresolvedCall(callable, assignments, andThen) {
    BaseStatement.call(this);
	this.resolved = null;
	this.callable = callable;
	this.assignments = assignments || null;
	this.andThen = andThen || null;
	return this;
}

UnresolvedCall.prototype  = Object.create(BaseStatement.prototype);
UnresolvedCall.prototype.constructor = UnresolvedCall;


UnresolvedCall.prototype.isSimple = function() {
    return this.andThen == null;
};


UnresolvedCall.prototype.toDialect = function(writer) {
    try {
        this.resolve(writer.context);
        this.resolved.toDialect(writer);
        this.andThenToDialect(writer);
    } catch(error) {
        this.callable.toDialect(writer);
        if(this.assignments!=null)
           this.assignments.toDialect(writer);
        this.andThenToDialect(writer);
    }
};


UnresolvedCall.prototype.andThenToDialect = function(writer) {
    if(this.andThen!=null) {
        writer.append(" then");
        if (writer.dialect == Dialect.O)
            writer.append(" {");
        else
            writer.append(":");
        writer = writer.newLine().indent();
        this.andThen.toDialect(writer);
        writer = writer.dedent();
        if (writer.dialect == Dialect.O)
            writer.append("}");
    }
};


UnresolvedCall.prototype.toString = function() {
    return this.callable.toString() + (this.assignments!=null ? this.assignments.toString() : "");
};
	
UnresolvedCall.prototype.check = function(context) {
	this.resolve(context);
	var result = this.resolved.check(context);
    if(this.andThen == null)
        return result;
    else {
        this.andThen.check(context, VoidType.instance);
        return VoidType.instance;
    }
};

UnresolvedCall.prototype.interpret = function(context) {
	this.resolve(context);
	var result = this.resolved.interpret(context);
    if(this.andThen == null)
        return result;
    else {
        this.andThen.interpret(context);
        return null;
    }
};

UnresolvedCall.prototype.interpretAssert = function(context, testMethodDeclaration) {
    this.resolve(context);
    if (this.resolved.interpretAssert)
        return this.resolved.interpretAssert(context, testMethodDeclaration);
    else {
        var expected = this.getExpected(context, this.dialect);
        throw new SyntaxError("Cannot test '" + expected + "'");
    }
};

UnresolvedCall.prototype.getExpected = function(context, dialect) {
    var writer = new CodeWriter(this.dialect, context);
    this.toDialect(writer);
    return writer.toString();
};


UnresolvedCall.prototype.transpileFound = function(transpiler, dialect) {
    transpiler.append("'<unknown>'");
};


UnresolvedCall.prototype.resolve = function(context) {
	if(this.resolved===null) {
		if(this.callable instanceof UnresolvedIdentifier) {
            this.resolved = this.resolveUnresolvedIdentifier(context);
		} else if (this.callable instanceof MemberSelector) {
            this.resolved = this.resolveMember(context);
		}
	}
};


UnresolvedCall.prototype.resolveUnresolvedIdentifier = function(context) {
	var id = this.callable.id;
    var call, decl = null;
    // if this happens in the context of a member method, then we need to check for category members first
    var instance = context.getClosestInstanceContext();
    if(instance!=null) {
        decl = this.resolveUnresolvedMember(instance, id.name);
        if(decl!=null)
            call = new MethodCall(new MethodSelector(null, id), this.assignments);
    }
    if(call==null) {
        var named = context.getRegisteredValue(id.name);
        if(named !== null) {
            var type = named.getType(context);
            if(type instanceof MethodType) {
                call = new MethodCall(new MethodSelector(null, id), this.assignments);
                call.variableName = id.name;
            }
        }
    }
    if(call==null) {
        decl = context.getRegisteredDeclaration(id.name);
        if (decl === null) {
            if (context.problemListener)
                context.problemListener.reportUnknownMethod(id);
            else
                throw new SyntaxError("Unknown name:" + id.name);
        }
        if (decl instanceof CategoryDeclaration) {
            call = new ConstructorExpression(new CategoryType(id), null, this.assignments, false);
        } else {
            call = new MethodCall(new MethodSelector(null, id), this.assignments);
        }
    }
    call.copySectionFrom(this);
    return call;
};

UnresolvedCall.prototype.resolveUnresolvedMember = function(context, name) {
    var decl = context.getRegisteredDeclaration(context.instanceType.name);
    var methods = decl.getMemberMethodsMap(context, name);
    if(methods!=null && !methods.isEmpty())
        return methods;
    else
        return null;
};


UnresolvedCall.prototype.resolveMember = function(context) {
	return new MethodCall(new MethodSelector(this.callable.parent, this.callable.id), this.assignments);
};


UnresolvedCall.prototype.declare = function(transpiler) {
    this.resolve(transpiler.context);
    this.resolved.declare(transpiler);
    if(this.andThen!=null) {
        var execute = require("../intrinsic/Async").execute;
        transpiler.require(execute);
        this.andThen.declare(transpiler);
    }
};


UnresolvedCall.prototype.transpile = function(transpiler) {
    this.resolve(transpiler.context);
    if(this.andThen!=null)
        this.transpileAsync(transpiler);
    else
        this.resolved.transpile(transpiler);
};


UnresolvedCall.prototype.transpileAsync = function(transpiler) {
    transpiler = transpiler.append("execute(function() {").indent();
    this.resolved.transpile(transpiler);
    transpiler = transpiler.dedent().append("}, function() {").indent();
    this.andThen.transpile(transpiler);
    transpiler = transpiler.dedent().append("})");
};

exports.UnresolvedCall = UnresolvedCall;