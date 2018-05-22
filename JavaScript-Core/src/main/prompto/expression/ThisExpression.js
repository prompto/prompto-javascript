var InstanceContext = require("../runtime/Context").InstanceContext;

function ThisExpression() {
    return this;
}

ThisExpression.prototype.check = function(context) {
    if (context != null && !(context instanceof InstanceContext))
        context = context.getParentContext ();
    if (context instanceof InstanceContext)
        return context.instanceType;
    else
        throw new SyntaxError ("Not in an instance context!");
};


ThisExpression.prototype.interpret = function(context) {
    if (context != null && !(context instanceof InstanceContext))
        context = context.getParentContext ();
    if (context instanceof InstanceContext)
        return context.instance;
    else
        throw new SyntaxError ("Not in an instance context!");
};

ThisExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

ThisExpression.prototype.toEDialect = function(writer) {
    writer.append("self");
};

ThisExpression.prototype.toODialect = function(writer) {
    writer.append("this");
};

ThisExpression.prototype.toMDialect = function(writer) {
    writer.append("self");
};

ThisExpression.prototype.toString = function() {
    return "this";
};

ThisExpression.prototype.declare = function(transpiler) {
    // nothing to do
};

ThisExpression.prototype.transpile = function(transpiler) {
    transpiler.append("this");
};

exports.ThisExpression = ThisExpression;
