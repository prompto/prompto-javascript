var Section = require("../parser/Section").Section;
var BooleanType = require("../type/BooleanType").BooleanType;
var IterableType = require("../type/IterableType").IterableType;
var ListType = require("../type/ListType").ListType;
var TupleType = require("../type/TupleType").TupleType;
var SetType = require("../type/SetType").SetType;
var Variable = require("../runtime/Variable").Variable;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var ListValue = require("../value/ListValue").ListValue;
var TupleValue = require("../value/TupleValue").TupleValue;
var SetValue = require("../value/SetValue").SetValue;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function FilteredExpression(itemId, source, predicate) {
	Section.call(this);
	this.itemId = itemId;
	this.source = source;
	this.predicate = predicate;
	return this;
}

FilteredExpression.prototype  = Object.create(Section.prototype);
FilteredExpression.prototype.constructor = FilteredExpression;


FilteredExpression.prototype.toDialect = function(dialect) {
	return this.source.toString() + " filtered with " + this.itemId + " where " + this.predicate.toString();
};

FilteredExpression.prototype.check = function(context) {
	var listType = this.source.check(context);
	if(!(listType instanceof IterableType)) {
		throw new SyntaxError("Expecting an iterable type as data source !");
	}
	var local = context.newChildContext();
	local.registerValue(new Variable(this.itemId, listType.itemType));
	var filterType = this.predicate.check(local);
	if(filterType!=BooleanType.instance) {
		throw new SyntaxError("Filtering expresion must return a boolean !");
	}
	return listType;
};


FilteredExpression.prototype.declare = function(transpiler) {
    this.source.declare(transpiler);
    var listType = this.source.check(transpiler.context);
    transpiler = transpiler.newChildTranspiler();
    transpiler.context.registerValue(new Variable(this.itemId, listType.itemType));
    this.predicate.declare(transpiler);
};

FilteredExpression.prototype.interpret = function(context) {
	var listType = this.source.check(context);
	if(!(listType instanceof IterableType)) {
		throw new InternalError("Illegal source type: " + listType.name);
	}
	var list = this.source.interpret(context);
	if(list==null) {
		throw new NullReferenceError();
	}
	if(!list.filter) {
		throw new InternalError("Illegal fetch source: " + this.source);
	}
	var itemType = listType.itemType;
    var local = context.newChildContext();
    var item = new Variable(this.itemId, itemType);
    local.registerValue(item);
    return list.filter(local, this.itemId, this.predicate)
};

FilteredExpression.prototype.transpile = function(transpiler) {
    var listType = this.source.check(transpiler.context);
    this.source.transpile(transpiler);
    transpiler.append(".filter(function(").append(this.itemId.name).append(") { return ")
    transpiler = transpiler.newChildTranspiler();
    transpiler.context.registerValue(new Variable(this.itemId, listType.itemType));
    this.predicate.transpile(transpiler);
    transpiler.append("; })");
    transpiler.flush();
};


FilteredExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FilteredExpression.prototype.toEDialect = function(writer) {
    this.source.toDialect(writer);
    writer.append(" filtered with ");
    writer.append(this.itemId.name);
    writer.append(" where ");
    this.predicate.toDialect(writer);
};


FilteredExpression.prototype.toODialect = function(writer) {
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
