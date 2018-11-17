var SyntaxError = require("../error/SyntaxError").SyntaxError;
var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var MemberSelector = null;
var MethodSelector = null;
var MethodCall = null;
var UnresolvedCall = null;
var UnresolvedIdentifier = null;
var ProblemListener = require("../problem/ProblemListener").ProblemListener;

exports.resolve = function() {
    MemberSelector = require("./MemberSelector").MemberSelector;
    MethodSelector = require("./MethodSelector").MethodSelector;
    MethodCall = require("../statement/MethodCall").MethodCall;
    UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
}


function UnresolvedSelector(parent, id) {
    SelectorExpression.call(this, parent);
    this.id = id;
    this.resolved = null;
    return this;
}

UnresolvedSelector.prototype = Object.create(SelectorExpression.prototype);
UnresolvedSelector.prototype.constructor = UnresolvedSelector;

Object.defineProperty(UnresolvedSelector.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

UnresolvedSelector.prototype.toString = function() {
    return this.parent ? this.parent.toString() + '.' + this.name : this.name;
};


UnresolvedSelector.prototype.toDialect = function(writer) {
    try {
        this.resolve(writer.context, false);
    } catch (e) {
        // pass
    }
    if (this.resolved)
        this.resolved.toDialect(writer);
    else {
        if (this.parent)
            this.parent.toDialect(writer);
        writer.append('.');
        writer.append(this.name);
    }
};


UnresolvedSelector.prototype.check = function(context) {
    return this.resolveAndCheck(context, false);
};



UnresolvedSelector.prototype.checkMember = function(context) {
    return this.resolveAndCheck(context, false);
};


UnresolvedSelector.prototype.interpret = function(context) {
    this.resolveAndCheck(context, false);
    return this.resolved.interpret(context);
};


UnresolvedSelector.prototype.resolveAndCheck = function(context, forMember) {
    this.resolve(context, forMember);
    return this.resolved ? this.resolved.check(context) : AnyType.instance;
};


UnresolvedSelector.prototype.resolve = function(context, forMember) {
    if (!this.resolved)
        this.resolved = this.resolveMethod(context);
    if (!this.resolved)
        this.resolved = this.resolveMember(context);
    if (!this.resolved)
        throw new SyntaxError("Unknown identifier:" + this.name);
    return this.resolved;
};



UnresolvedSelector.prototype.resolveMember = function(context) {
    var listener = context.problemListener;
    context.problemListener = new ProblemListener();
    try {
        var member = new MemberSelector(this.parent, this.id);
        member.check(context);
        return member;
    } catch (e) {
        if(e instanceof SyntaxError)
            return null;
        else
            throw e;
    } finally {
        context.problemListener = listener;
    }
};


UnresolvedSelector.prototype.resolveMethod = function(context) {
    var listener = context.problemListener;
    context.problemListener = new ProblemListener();
    try {
        var resolvedParent = this.parent;
        if (resolvedParent instanceof UnresolvedIdentifier) {
            resolvedParent.checkMember(context);
            resolvedParent = resolvedParent.resolved;
        }
        var method = new UnresolvedCall(new MethodSelector(resolvedParent, this.id), null);
        method.check(context);
        return method;
    } catch (e) {
        if(e instanceof SyntaxError)
            return null;
        else
            throw e;
    } finally {
        context.problemListener = listener;
    }
};


UnresolvedSelector.prototype.declare = function(transpiler) {
    if(this.resolved==null)
        this.resolve(transpiler.context, false);
    this.resolved.declare(transpiler);
};


UnresolvedSelector.prototype.transpile = function(transpiler) {
    if(this.resolved==null)
        this.resolve(transpiler.context, false);
    this.resolved.transpile(transpiler);
};


exports.UnresolvedSelector = UnresolvedSelector;

