var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var UnresolvedIdentifier = null;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var NullValue = require("../value/NullValue").NullValue;
var Dialect = require("../parser/Dialect").Dialect;
var MethodType = require("../type/MethodType").MethodType;
var VoidType = require("../type/VoidType").VoidType;
var ParenthesisExpression = null;
var UnresolvedCall = null;

exports.resolve = function() {
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
    ParenthesisExpression = require("./ParenthesisExpression").ParenthesisExpression;
    UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
};

function MemberSelector(parent, id) {
	SelectorExpression.call(this, parent);
	this.id = id;
	return this;
}

MemberSelector.prototype = Object.create(SelectorExpression.prototype);
MemberSelector.prototype.constructor = MemberSelector;

Object.defineProperty(MemberSelector.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


MemberSelector.prototype.toDialect = function(writer) {
    if (writer.dialect == Dialect.E)
        this.toEDialect(writer);
    else
        this.toOMDialect(writer);
};


MemberSelector.prototype.toEDialect = function(writer) {
    var type = this.check(writer.context);
    if (type instanceof MethodType) {
        writer.append("Method: ");
    }
    this.parentAndMemberToDialect(writer);
};


MemberSelector.prototype.toOMDialect = function(writer) {
    this.parentAndMemberToDialect(writer);
};


MemberSelector.prototype.parentAndMemberToDialect = function(writer) {
    // ensure singletons are not treated as constructors
    try {
        this.resolveParent(writer.context);
    } catch(e) {
        // ignore
    }
    if (writer.dialect == Dialect.E)
        this.parentToEDialect(writer);
    else
        this.parentToOMDialect(writer);
    writer.append(".");
    writer.append(this.name);
};


MemberSelector.prototype.parentToEDialect = function(writer) {
    if(this.parent instanceof UnresolvedCall) {
        writer.append('(');
        this.parent.toDialect(writer);
        writer.append(')');
    } else
        this.parent.parentToDialect(writer);
};


MemberSelector.prototype.parentToOMDialect = function(writer) {
    if(this.parent instanceof ParenthesisExpression && this.parent.expression instanceof UnresolvedCall)
        this.parent.expression.toDialect(writer);
    else
        this.parent.parentToDialect(writer);
};


MemberSelector.prototype.declare = function(transpiler) {
    var parent = this.resolveParent(transpiler.context);
    parent.declareParent(transpiler);
    var parentType = this.checkParent(transpiler.context);
    return parentType.declareMember(transpiler, this.name);
};


MemberSelector.prototype.transpile = function(transpiler) {
    var parent = this.resolveParent(transpiler.context);
    parent.transpileParent(transpiler);
    transpiler.append(".");
    var parentType = this.checkParent(transpiler.context);
    parentType.transpileMember(transpiler, this.name);
    return false;
};

MemberSelector.prototype.toString = function() {
	return this.parent.toString() + "." + this.name;
};

MemberSelector.prototype.check = function(context) {
    var parentType = this.checkParent(context);
    return parentType ? parentType.checkMember(context, this.id, this.name) : VoidType.instance;
};

MemberSelector.prototype.interpret = function(context) {
    // resolve parent to keep clarity
    var parent = this.resolveParent(context);
    var instance = parent.interpret(context);
    if (instance == null || instance == NullValue.instance)
        throw new NullReferenceError();
    else
        return instance.getMemberValue(context, this.name, true);
};


MemberSelector.prototype.resolveParent = function(context) {
    if(this.parent instanceof UnresolvedIdentifier) {
        this.parent.checkMember(context);
        return this.parent.resolved;
    } else
        return this.parent;
};

exports.MemberSelector = MemberSelector;

