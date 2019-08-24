var Expression = require("./Expression").Expression;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var ArrowExpression = require("./ArrowExpression").ArrowExpression;
var InternalError = require("../error/InternalError").InternalError;
var CategoryType = require("../type/CategoryType").CategoryType;
var DocumentType = require("../type/DocumentType").DocumentType;
var ListValue = require("../value/ListValue").ListValue;
var TupleValue = require("../value/TupleValue").TupleValue;
var SetValue = require("../value/SetValue").SetValue;
var ListType = require("../type/ListType").ListType;
var TupleType = require("../type/TupleType").TupleType;
var SetType = require("../type/SetType").SetType;
var List = require("../intrinsic/List").List;

function SortedExpression(source, desc, key) {
    Expression.call(this);
	this.source = source;
    this.desc = desc;
	this.key = key || null;
	return this;
}

SortedExpression.prototype = Object.create(Expression.prototype);
SortedExpression.prototype.constructor = SortedExpression;

SortedExpression.prototype.toString = function() {
	return "sorted " + (this.desc ? "descending " : "") + this.source.toString() +
		(this.key==null ? "" : " with " + this.key.toString() + " as key");
};

SortedExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

SortedExpression.prototype.toEDialect = function(writer) {
    writer.append("sorted ");
    if(this.desc)
        writer.append("descending ");
    this.source.toDialect(writer);
    if(this.key!=null) {
        var type = this.source.check(writer.context);
        var itemType = type.itemType;
        writer = this.contextualizeWriter(writer, itemType);
        writer.append(" with ");
        var keyExp = this.key;
        if(keyExp instanceof UnresolvedIdentifier) try {
            keyExp = keyExp.resolve(writer.context, false);
        } catch (e) {
            // TODO add warning
        }
        if(keyExp instanceof ArrowExpression) {
            keyExp.registerArrowArgs(writer.context, itemType);
            keyExp.toDialect(writer);
        } else if(keyExp instanceof InstanceExpression)
            keyExp.toDialect(writer, false);
        else
            keyExp.toDialect(writer);
        writer.append(" as key");
    }
}

SortedExpression.prototype.toODialect = function(writer) {
    writer.append("sorted ");
    if(this.desc)
        writer.append("desc ");
    writer.append("(");
    this.source.toDialect(writer);
    if(this.key!=null) {
        var type = this.source.check(writer.context);
        var itemType = type.itemType;
        writer = this.contextualizeWriter(writer, itemType);
        writer.append(", key = ");
        this.key.toDialect(writer);
    }
    writer.append(")");
}

SortedExpression.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
}

SortedExpression.prototype.contextualizeWriter = function(writer, itemType) {
    if (itemType instanceof CategoryType)
        return writer.newInstanceWriter(itemType);
    else if (itemType instanceof DocumentType)
        return writer.newDocumentWriter();
    else
        return writer;
};


SortedExpression.prototype.check = function(context) {
	var type = this.source.check(context);
	if(!(type instanceof ListType || type instanceof SetType)) {
		throw new SyntaxError("Unsupported type: " + type);
	}
	return type;
};


SortedExpression.prototype.interpret = function(context) {
	var type = this.source.check(context);
	if(!(type instanceof ListType || type instanceof SetType)) {
		throw new SyntaxError("Unsupported type: " + type);
	}
	var coll = this.source.interpret(context);
	if(coll==null) {
		throw new NullReferenceError();
	}
	if(!(coll instanceof ListValue || coll instanceof SetValue)) {
		throw new InternalError("Unexpected type:" + typeof(coll));
	}
	var items = coll instanceof ListValue ? coll.items : coll.items.set.values();
    items = Array.from(items);
	var itemType = type.itemType;
	if(items.length > 1) {
        var cmp = itemType.getSortedComparator(context, this.key, this.desc);
        items.sort(cmp);
    }
    return new ListValue(itemType, items);
};


SortedExpression.prototype.declare = function(transpiler) {
    transpiler.require(List);
    this.source.declare(transpiler);
    var type = this.source.check(transpiler.context);
    type.itemType.declareSorted(transpiler, this.key);
};


SortedExpression.prototype.transpile = function(transpiler) {
    var type = this.source.check(transpiler.context);
    this.source.transpile(transpiler);
    transpiler.append(".sorted(");
    type.itemType.transpileSortedComparator(transpiler, this.key, this.desc);
    transpiler.append(")");
};


exports.SortedExpression = SortedExpression;
