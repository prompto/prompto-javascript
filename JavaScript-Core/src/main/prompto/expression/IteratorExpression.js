var Expression = require("./Expression").Expression;
var Variable = require("../runtime/Variable").Variable;
var Identifier = require("../grammar/Identifier").Identifier;
var IteratorType = require("../type/IteratorType").IteratorType;
var IterableValue = require("../value/IterableValue").IterableValue;
var UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
var ParenthesisExpression = require("./ParenthesisExpression").ParenthesisExpression;
var InternalError = require("../error/InternalError").InternalError;


function IteratorExpression(name, source, expression) {
    Expression.call(this);
    this.name = name;
    this.source = source;
    this.expression = expression;
    return this;
}

IteratorExpression.prototype = Object.create(Expression.prototype);
IteratorExpression.prototype.constructor = IteratorExpression;


IteratorExpression.prototype.check = function(context) {
    var elemType = this.source.check(context).checkIterator(context, this.source);
    var child = context.newChildContext();
    child.registerValue(new Variable(this.name, elemType));
    var itemType = this.expression.check(child);
    return new IteratorType(itemType);
};


IteratorExpression.prototype.interpret = function(context) {
    var elemType = this.source.check(context).checkIterator(context, this.source);
    var items = this.source.interpret(context);
    var length = items.getMemberValue(context, new Identifier("count"), false);
    var iterator = this.getIterator(context, items);
    return new IterableValue(context, this.name, elemType, iterator, length, this.expression);
};


IteratorExpression.prototype.declare = function(transpiler) {
    this.source.declare(transpiler);
    var sourceType = this.source.check(transpiler.context);
    sourceType.declareIterator(transpiler, this.name, this.expression);
};


IteratorExpression.prototype.transpile = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    /*var resultType = */srcType.checkIterator(transpiler.context, this.source);
    this.source.transpile(transpiler);
    transpiler = transpiler.newChildTranspiler()
    srcType.transpileIterator(transpiler, this.name, this.expression);
    transpiler.flush()
};


IteratorExpression.prototype.getIterator = function(context, src) {
    if (src.getIterator)
        return src.getIterator();
    else
        throw new InternalError("Should never get there!");
};

IteratorExpression.prototype.toDialect = function(writer) {
    var srcType = this.source.check(writer.context);
    writer = writer.newChildWriter();
    var resultType = srcType.checkIterator(writer.context, this.source);
    writer.context.registerValue(new Variable(this.name, resultType));
    writer.toDialect(this);
};

IteratorExpression.prototype.toMDialect = function(writer) {
    var expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
    expression.toDialect(writer);
    writer.append(" for each ");
    writer.append(this.name.toString());
    writer.append(" in ");
    this.source.toDialect(writer);
};

IteratorExpression.prototype.toODialect = function(writer) {
    var expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
    expression.toDialect(writer);
    writer.append(" for each ( ");
    writer.append(this.name.toString());
    writer.append(" in ");
    this.source.toDialect(writer);
    writer.append(" )");
};

IteratorExpression.prototype.toEDialect = function(writer) {
    var expression = IteratorExpression.encloseInParenthesisIfRequired(this.expression);
    expression.toDialect(writer);
    writer.append(" for each ");
    writer.append(this.name.toString());
    writer.append(" in ");
    this.source.toDialect(writer);
};


IteratorExpression.encloseInParenthesisIfRequired = function(expression) {
    if(IteratorExpression.mustBeEnclosedInParenthesis(expression))
        return new ParenthesisExpression(expression);
    else
        return expression;
};

IteratorExpression.extractFromParenthesisIfPossible = function(expression) {
    if(expression instanceof ParenthesisExpression) {
        var enclosed = expression.expression;
        if(IteratorExpression.mustBeEnclosedInParenthesis(enclosed))
            return enclosed;
    }
    return expression;
};

IteratorExpression.mustBeEnclosedInParenthesis = function(expression) {
    return expression instanceof UnresolvedCall;
};


exports.IteratorExpression = IteratorExpression;
