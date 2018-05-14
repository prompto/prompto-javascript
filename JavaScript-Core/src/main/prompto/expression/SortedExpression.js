var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var InternalError = require("../error/InternalError").InternalError;
var CategoryType = require("../type/CategoryType").CategoryType;
var ListValue = require("../value/ListValue").ListValue;
var TupleValue = require("../value/TupleValue").TupleValue;
var SetValue = require("../value/SetValue").SetValue;
var ListType = require("../type/ListType").ListType;
var TupleType = require("../type/TupleType").TupleType;
var SetType = require("../type/SetType").SetType;

function SortedExpression(source, desc, key) {
	this.source = source;
    this.desc = desc;
	this.key = key || null;
	return this;
}

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
        writer.append(" with ");
        var keyExp = this.key;
        if(keyExp instanceof UnresolvedIdentifier) try {
            keyExp = keyExp.resolve(writer.context, false);
        } catch (e) {
            // TODO add warning
        }
        if(keyExp instanceof InstanceExpression)
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
        writer.append(", key = ");
        this.key.toDialect(writer);
    }
    writer.append(")");
}

SortedExpression.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
}

SortedExpression.prototype.check = function(context) {
	var type = this.source.check(context);
	if(!(type instanceof ListType || type instanceof TupleType || type instanceof SetType)) {
		throw new SyntaxError("Unsupported type: " + type);
	}
	return type;
};


SortedExpression.prototype.interpret = function(context) {
	var type = this.source.check(context);
	if(!(type instanceof ListType || type instanceof TupleType || type instanceof SetType)) {
		throw new SyntaxError("Unsupported type: " + type);
	}
	var coll = this.source.interpret(context);
	if(coll==null) {
		throw new NullReferenceError();
	}
	if(!(coll instanceof ListValue || coll instanceof TupleValue || coll instanceof SetValue)) {
		throw new InternalError("Unexpected type:" + typeof(coll));
	}
	var itemType = type.itemType;
	if(itemType instanceof CategoryType) {
		return itemType.sort(context, coll, this.desc, this.key);
	} else {
		return itemType.sort(context, coll, this.desc);
	}
};


SortedExpression.prototype.declare = function(transpiler) {
    this.source.declare(transpiler);
    var type = this.source.check(transpiler.context);
    type.itemType.declareSorted(transpiler, this.key);
};

SortedExpression.prototype.transpile = function(transpiler) {
    var type = this.source.check(transpiler.context);
    transpiler.append("Array.from(");
    this.source.transpile(transpiler);
    transpiler.append(").sort(");
    type.itemType.transpileSorted(transpiler, this.key, this.desc);
    transpiler.append(")");
};


exports.SortedExpression = SortedExpression;
