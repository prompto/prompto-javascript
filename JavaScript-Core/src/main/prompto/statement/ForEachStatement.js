var BaseStatement = require("./BaseStatement").BaseStatement;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var Variable = require("../runtime/Variable").Variable;
var IntegerType = require("../type/IntegerType").IntegerType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var InternalError = require("../error/InternalError").InternalError;
var BreakResult = require("../runtime/BreakResult").BreakResult;

function ForEachStatement(v1, v2, source, statements) {
	BaseStatement.call(this);
	this.v1 = v1 || null;
	this.v2 = v2 || null;
	this.source = source;
	this.statements = statements;
	return this;
}

ForEachStatement.prototype = Object.create(BaseStatement.prototype);
ForEachStatement.prototype.constructor = ForEachStatement;

ForEachStatement.prototype.check = function(context) {
	var srcType = this.source.check(context);
	var elemType = srcType.checkIterator(context);
	return this.checkItemIterator(elemType, context);
};

ForEachStatement.prototype.checkItemIterator = function(elemType, context) {
	var child = context.newChildContext();
	var itemName = this.v2 === null ? this.v1 : this.v2;
	context.registerValue(new Variable(itemName, elemType));
	if (this.v2 !== null) {
		context.registerValue(new Variable(this.v1, IntegerType.instance));
	}
	return this.statements.check(child, null);
};

ForEachStatement.prototype.interpret = function(context) {
	var srcType = this.source.check(context);
	var elemType = srcType.checkIterator(context);
	return this.evaluateItemIterator(elemType, context);
};

ForEachStatement.prototype.evaluateItemIterator = function(elemType, context) {
	if (this.v2 === null) {
		return this.evaluateItemIteratorNoIndex(elemType, context);
	} else {
		return this.evaluateItemIteratorWithIndex(elemType, context);
	}
};

ForEachStatement.prototype.evaluateItemIteratorNoIndex = function(elemType, context) {
	var src = this.source.interpret(context);
	var iterator = this.getIterator(context, src);
	while (iterator.hasNext()) {
		var child = context.newChildContext();
		child.registerValue(new Variable(this.v1, elemType));
        var value = iterator.next();
		child.setValue(this.v1, value);
		value = this.statements.interpret(child);
        if(value==BreakResult.instance)
            break;
		if (value != null) {
			return value;
		}
	}
	return null;
};

ForEachStatement.prototype.getIterator = function(context, src) {
    if(src.getIterator)
        return src.getIterator();
    else if(src.hasNext && src.next)
        return src;
    else
        throw new InternalError("Should never end up here!");
};

ForEachStatement.prototype.evaluateItemIteratorWithIndex = function(elemType, context) {
	var src = this.source.interpret(context);
	var iterator = src.getIterator(context);
	var index = 0;
	while (iterator.hasNext()) {
		var child = context.newChildContext();
		child.registerValue(new Variable(this.v2, elemType));
		child.setValue(this.v2, iterator.next());
		child.registerValue(new Variable(this.v1, IntegerType.instance));
		child.setValue(this.v1, new IntegerValue(++index));
		var value = this.statements.interpret(child);
		if (value != null) {
			return value;
		}
	}
	return null;
};

ForEachStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

ForEachStatement.prototype.toODialect = function(writer) {
    writer.append("for each (");
    writer.append(this.v1.name);
    if(this.v2 !== null) {
        writer.append(", ");
        writer.append(this.v2.name);
    }
    writer.append(" in ");
    this.source.toDialect(writer);
    writer.append(")");
    var oneLine = this.statements.length === 1 && (this.statements[0] instanceof SimpleStatement);
    if(!oneLine)
        writer.append(" {");
    writer.newLine();
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    if(!oneLine) {
        writer.append("}");
        writer.newLine();
    }
};

ForEachStatement.prototype.toEDialect = function(writer) {
    writer.append("for each ");
    writer.append(this.v1.name);
    if(this.v2 !== null) {
        writer.append(", ");
        writer.append(this.v2.name);
    }
    writer.append(" in ");
    this.source.toDialect(writer);
    writer.append(":");
    writer.newLine();
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ForEachStatement.prototype.toMDialect = function(writer) {
    writer.append("for ");
    writer.append(this.v1.name);
    if(this.v2!=null) {
        writer.append(", ");
        writer.append(this.v2.name);
    }
    writer.append(" in ");
    this.source.toDialect(writer);
    writer.append(":");
    writer.newLine();
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ForEachStatement.prototype.canReturn = function() {
    return true;
};


exports.ForEachStatement = ForEachStatement;