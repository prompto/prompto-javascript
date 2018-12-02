var InstanceContext = require("../runtime/Context").InstanceContext;
var DocumentContext = require("../runtime/Context").DocumentContext;
var DocumentType = require("../type/DocumentType").DocumentType;

function ThisExpression() {
    return this;
}

ThisExpression.prototype.check = function(context) {
    if (context instanceof DocumentContext)
        return DocumentType.instance;
    if (context != null && !(context instanceof InstanceContext))
        context = context.getClosestInstanceContext ();
    if (context instanceof InstanceContext)
        return context.instanceType;
    else
        throw new SyntaxError ("Not in an instance context!");
};


ThisExpression.prototype.interpret = function(context) {
    if (context instanceof DocumentContext)
        return context.document;
    if (context != null && !(context instanceof InstanceContext))
        context = context.getClosestInstanceContext ();
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
