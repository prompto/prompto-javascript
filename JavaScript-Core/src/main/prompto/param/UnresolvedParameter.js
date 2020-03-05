var ProblemCollector = require("../problem/ProblemCollector").ProblemCollector;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var AttributeParameter = require("./AttributeParameter").AttributeParameter;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
var MethodParameter = require("./MethodParameter").MethodParameter;
var VoidType = require("../type/VoidType").VoidType;

function UnresolvedParameter(id) {
    this.id = id;
    this.resolved = null;
    return this;
}

Object.defineProperty(UnresolvedParameter.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

UnresolvedParameter.prototype.getTranspiledName =  function(context) {
    this.resolveAndCheck(context);
    return this.resolved.getTranspiledName(context);
};


UnresolvedParameter.prototype.toDialect = function(writer) {
    writer.append(this.name);
    if(this.defaultExpression!=null) {
        writer.append(" = ");
        this.defaultExpression.toDialect(writer);
    }
};

UnresolvedParameter.prototype.check = function(context) {
    this.resolveAndCheck(context);
};

UnresolvedParameter.prototype.getProto = function() {
    return this.name;
};

UnresolvedParameter.prototype.getType = function(context) {
    this.resolveAndCheck(context);
    return this.resolved.getType(context);
};

UnresolvedParameter.prototype.register = function(context) {
    this.resolveAndCheck(context);
    if(this.resolved!=null)
        this.resolved.register(context);
    if(this.defaultExpression!=null)
        context.setValue(this.id, this.defaultExpression.interpret(context));
};

UnresolvedParameter.prototype.checkValue = function(context, value) {
    this.resolveAndCheck(context);
    if(this.resolved!=null)
        return this.resolved.checkValue(context, value);
    else
        return VoidType.instance;
};

UnresolvedParameter.prototype.resolveAndCheck = function(context) {
    if(this.resolved!=null)
        return;
    // ignore problems during resolution
    var listener = context.problemListener;
    try {
        context.problemListener = new ProblemCollector();
        // try out various solutions
        var named = context.getRegisteredDeclaration(this.name);
        if (named instanceof AttributeDeclaration) {
            this.resolved = new AttributeParameter(this.id);
        } else if (named instanceof MethodDeclarationMap) {
            this.resolved = new MethodParameter(this.id);
        }
    } finally {
        // restore listener
        context.problemListener = listener;
    }
    if(this.resolved==null)
        context.problemListener.reportUnknownVariable(this.id);
};

UnresolvedParameter.prototype.declare = function(transpiler) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.declare(transpiler);
};

UnresolvedParameter.prototype.transpile = function(transpiler) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.transpile(transpiler);
};

UnresolvedParameter.prototype.transpileCall = function(transpiler, expression) {
    this.resolveAndCheck(transpiler.context);
    this.resolved.transpileCall(transpiler, expression);
};

UnresolvedParameter.prototype.equals = function(other) {
    return other === this || (other instanceof UnresolvedParameter && this.name === other.name);
};


exports.UnresolvedParameter = UnresolvedParameter;

