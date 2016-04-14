var Section = require("../parser/Section").Section;
var BooleanType = require("../type/BooleanType").BooleanType;
var ListType = require("../type/ListType").ListType;
var TupleType = require("../type/TupleType").TupleType;
var SetType = require("../type/SetType").SetType;
var Variable = require("../runtime/Variable").Variable;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var ListValue = require("../value/ListValue").ListValue;
var TupleValue = require("../value/TupleValue").TupleValue;
var SetValue = require("../value/SetValue").SetValue;
var Bool = require("../value/Bool").Bool;

function FetchExpression(itemId, source, filter) {
	Section.call(this);
	this.itemId = itemId;
	this.source = source;
	this.filter = filter;
	return this;
}

FetchExpression.prototype  = Object.create(Section.prototype);
FetchExpression.prototype.constructor = FetchExpression;


FetchExpression.prototype.toDialect = function(dialect) {
	return "fetch any " + this.itemId + " from " + this.source.toString() + " where " + this.filter.toString();
};

FetchExpression.prototype.check = function(context) {
	var listType = this.source.check(context);
	if(!(listType instanceof ListType || listType instanceof TupleType || listType instanceof SetType)) {
		throw new SyntaxError("Expecting a list type as data source !");
	}
	var local = context.newLocalContext();
	local.registerValue(new Variable(this.itemId,listType.itemType));
	var filterType = this.filter.check(local);
	if(filterType!=BooleanType.instance) {
		throw new SyntaxError("Filtering expresion must return a boolean !");
	}
	return listType;
};

FetchExpression.prototype.interpret = function(context) {
	var listType = this.source.check(context);
	if(!(listType instanceof ListType || listType instanceof TupleType || listType instanceof SetType)) {
		throw new InternalError("Illegal source type: " + listType.getName());
	}
	var list = this.source.interpret(context);
	if(list==null) {
		throw new NullReferenceError();
	}
	if(!(list instanceof ListValue || list instanceof TupleValue || list instanceof SetValue)) {
		throw new InternalError("Illegal fetch source: " + this.source);
	}
	var itemType = listType.itemType;
    var local = context.newLocalContext();
    var item = new Variable(this.itemId, itemType);
    local.registerValue(item);
    return list.filter(local, this.itemId, this.filter)
};

FetchExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

FetchExpression.prototype.toEDialect = function(writer) {
    writer.append("fetch any ");
    writer.append(this.itemId.name);
    writer.append(" from ");
    this.source.toDialect(writer);
    writer.append(" where ");
    this.filter.toDialect(writer);
};


FetchExpression.prototype.toODialect = function(writer) {
    writer.append("fetch (");
    writer.append(this.itemId.name);
    writer.append(")");
    writer.append(" from ");
    this.source.toDialect(writer);
    writer.append(" where ");
    this.filter.toDialect(writer);
};

FetchExpression.prototype.toSDialect = function(writer) {
    writer.append("fetch ");
    writer.append(this.itemId.name);
    writer.append(" from ");
    this.source.toDialect(writer);
    writer.append(" where ");
    this.filter.toDialect(writer);
};

exports.FetchExpression = FetchExpression;
