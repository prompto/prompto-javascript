var Expression = require("./Expression").Expression;
var BooleanType = require("../type/BooleanType").BooleanType;
var IterableType = require("../type/IterableType").IterableType;
var Variable = require("../runtime/Variable").Variable;
var InternalError = require("../error/InternalError").InternalError;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;


function FilteredExpression(itemId, source, predicate) {
    Expression.call(this);
	this.itemId = itemId;
	this.source = source;
	this.predicate = predicate;
	return this;
}

FilteredExpression.prototype  = Object.create(Expression.prototype);
FilteredExpression.prototype.constructor = FilteredExpression;


FilteredExpression.prototype.toString = function(dialect) {
	return this.source.toString() + " filtered with " + this.itemId + " where " + this.predicate.toString();
};

FilteredExpression.prototype.check = function(context) {
	var sourceType = this.source.check(context);
	if(!(sourceType instanceof IterableType)) {
		throw new SyntaxError("Expecting an iterable type as data source !");
	}
    var itemType = sourceType.itemType;
	if(this.itemId!=null) {
        var child = context.newChildContext();
        child.registerValue(new Variable(this.itemId, itemType));
        var filterType = this.predicate.check(child);
        if (filterType != BooleanType.instance) {
            throw new SyntaxError("Filtering expression must return a boolean !");
        }
    } else if(this.predicate instanceof ArrowExpression) {
        // TODO
    } else
        throw new SyntaxError("Expecting an arrow expression!");
    return sourceType;
};


FilteredExpression.prototype.interpret = function(context) {
	var sourceType = this.source.check(context);
	if(!(sourceType instanceof IterableType)) {
		throw new InternalError("Illegal source type: " + sourceType.name);
	}
	var iterable = this.source.interpret(context);
	if(iterable==null) {
		throw new NullReferenceError();
	}
	if(!iterable.filter) {
		throw new InternalError("Illegal fetch source: " + this.source);
	}
    var itemType = sourceType.itemType;
    var arrow = this.toArrowExpression();
    var filter = arrow.getFilter(context, itemType);
    return iterable.filter(filter)
};

FilteredExpression.prototype.toArrowExpression = function() {
    if(this.itemId!=null) {
        var arrow = new ArrowExpression(new IdentifierList(this.itemId), null, null);
        arrow.setExpression(this.predicate);
        return arrow;
    } else if(this.predicate instanceof ArrowExpression)
        return this.predicate;
    else
        throw new SyntaxError("Not a valid filter!");
};


FilteredExpression.prototype.declare = function(transpiler) {
    this.source.declare(transpiler);
    var listType = this.source.check(transpiler.context);
    var itemType = listType.itemType;
    var arrow = this.toArrowExpression();
    arrow.declareFilter(transpiler, itemType);
};


FilteredExpression.prototype.transpile = function(transpiler) {
    var listType = this.source.check(transpiler.context);
    var itemType = listType.itemType;
    this.source.transpile(transpiler);
    transpiler.append(".filtered(");
    var arrow = this.toArrowExpression();
    arrow.transpileFilter(transpiler, itemType);
    transpiler.append(")");
    transpiler.flush();
};


FilteredExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


FilteredExpression.prototype.toEDialect = function(writer) {
    if (this.itemId)
        this.toEDialectExplicit(writer);
    else if (this.predicate instanceof ArrowExpression)
        this.predicate.filterToDialect(writer, this.source);
    else
        throw new SyntaxError("Expected an arrow expression!");
};

FilteredExpression.prototype.toEDialectExplicit = function(writer) {
    writer = writer.newChildWriter();
    var sourceType = this.source.check(writer.context);
    var itemType = sourceType.itemType;
    writer.context.registerValue(new Variable(this.itemId, itemType));
    this.source.toDialect(writer);
    writer.append(" filtered with ");
    writer.append(this.itemId.name);
    writer.append(" where ");
    this.predicate.toDialect(writer);
};


FilteredExpression.prototype.toODialect = function(writer) {
    if (this.itemId)
        this.toODialectExplicit(writer);
    else if (this.predicate instanceof ArrowExpression)
        this.predicate.filterToDialect(writer, this.source);
    else
        throw new SyntaxError("Expected an arrow expression!");
};

FilteredExpression.prototype.toODialectExplicit = function(writer) {
    writer = writer.newChildWriter();
    var sourceType = this.source.check(writer.context);
    var itemType = sourceType.itemType;
    writer.context.registerValue(new Variable(this.itemId, itemType));
    writer.append("filtered (");
    this.source.toDialect(writer);
    writer.append(") with (");
    writer.append(this.itemId.name);
    writer.append(") where (");
    this.predicate.toDialect(writer);
    writer.append(")");
};

FilteredExpression.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

exports.FilteredExpression = FilteredExpression;
