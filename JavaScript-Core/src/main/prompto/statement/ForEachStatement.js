var BaseStatement = require("./BaseStatement").BaseStatement;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var Variable = require("../runtime/Variable").Variable;
var IntegerType = require("../type/IntegerType").IntegerType;
var ListType = require("../type/ListType").ListType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var InternalError = require("../error/InternalError").InternalError;
var BreakResult = require("../runtime/BreakResult").BreakResult;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;

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
	return this.interpretItemIterator(elemType, context);
};

ForEachStatement.prototype.interpretItemIterator = function(elemType, context) {
	if (this.v2 === null) {
		return this.interpretItemIteratorNoIndex(elemType, context);
	} else {
		return this.interpretItemIteratorWithIndex(elemType, context);
	}
};

ForEachStatement.prototype.interpretItemIteratorNoIndex = function(elemType, context) {
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

ForEachStatement.prototype.interpretItemIteratorWithIndex = function(elemType, context) {
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

ForEachStatement.prototype.declare = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    if(srcType instanceof DictionaryType)
        transpiler.require(StrictSet);
    var elemType = srcType.checkIterator(transpiler.context);
    this.source.declare(transpiler);
    transpiler = transpiler.newChildTranspiler();
    if(this.v2) {
        transpiler.context.registerValue(new Variable(this.v1, IntegerType.instance));
        transpiler.context.registerValue(new Variable(this.v2, elemType));
    } else
        transpiler.context.registerValue(new Variable(this.v1, elemType));
    this.statements.declare(transpiler);
};

ForEachStatement.prototype.transpile = function(transpiler) {
    if(this.v2)
        this.transpileWithIndex(transpiler);
    else
        this.transpileNoIndex(transpiler);
    return true;
};

ForEachStatement.prototype.transpileNoIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    if(srcType instanceof ListType)
        this.transpileArrayNoIndex(transpiler);
    else
        this.transpileIteratorNoIndex(transpiler);
};


ForEachStatement.prototype.transpileArrayNoIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    var elemType = srcType.checkIterator(transpiler.context);
    var itemsName = this.v1.name + "_items";
    transpiler.append("var ").append(itemsName).append(" = ");
    this.source.transpile(transpiler);
    transpiler.append(";").newLine();
    var idxName = this.v1.name + "_idx";
    transpiler.append("for(var ").append(idxName).append(" = 0; ").append(idxName).append(" < ").append(itemsName).append(".length; ").append(idxName).append("++) {");
    transpiler = transpiler.newChildTranspiler();
    transpiler.indent();
    transpiler.context.registerValue(new Variable(this.v1, elemType));
    transpiler.append("var ").append(this.v1.name).append(" = ").append(itemsName).append("[").append(idxName).append("];")
    this.statements.transpile(transpiler);
    transpiler.dedent();
    transpiler.flush();
    transpiler.append("}");
    transpiler.newLine();
 };


ForEachStatement.prototype.transpileIteratorNoIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    var elemType = srcType.checkIterator(transpiler.context);
    var iterName = this.v1.name + "_iterator";
    transpiler.append("var ").append(iterName).append(" = ");
    this.source.transpile(transpiler);
    if(srcType instanceof DictionaryType)
        transpiler.append(".entries();");
    else
        transpiler.append(".values();");
    transpiler.newLine();
    transpiler.append("while(").append(iterName).append(".hasNext()) {");
    transpiler = transpiler.newChildTranspiler();
    transpiler.indent();
    transpiler.context.registerValue(new Variable(this.v1, elemType));
    transpiler.append("var ").append(this.v1.name).append(" = ").append(iterName).append(".next();")
    transpiler.newLine();
    this.statements.transpile(transpiler);
    transpiler.dedent();
    transpiler.flush();
    transpiler.append("}");
    transpiler.newLine();
};

ForEachStatement.prototype.transpileWithIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    if(srcType instanceof ListType)
        this.transpileArrayWithIndex(transpiler);
    else
        this.transpileIteratorWithIndex(transpiler);
};


ForEachStatement.prototype.transpileArrayWithIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    var elemType = srcType.checkIterator(transpiler.context);
    var itemsName = this.v2.name + "_items";
    transpiler.append("var ").append(itemsName).append(" = ");
    this.source.transpile(transpiler);
    transpiler.append(";").newLine();
    transpiler.append("for(var ").append(this.v1.name).append(" = 1; ").append(this.v1.name).append(" <= ").append(itemsName).append(".length; ").append(this.v1.name).append("++) {");
    transpiler = transpiler.newChildTranspiler();
    transpiler.indent();
    transpiler.context.registerValue(new Variable(this.v1, IntegerType.instance));
    transpiler.context.registerValue(new Variable(this.v2, elemType));
    transpiler.append("var ").append(this.v2.name).append(" = ").append(itemsName).append("[").append(this.v1.name).append("-1];").newLine();
    this.statements.transpile(transpiler);
    transpiler.dedent();
    transpiler.flush();
    transpiler.append("}");
    transpiler.newLine();
};


ForEachStatement.prototype.transpileIteratorWithIndex = function(transpiler) {
    var srcType = this.source.check(transpiler.context);
    var elemType = srcType.checkIterator(transpiler.context);
    transpiler.append("var ").append(this.v1.name).append(" = 1;").newLine();
    var iterName = this.v2.name + "_iterator";
    transpiler.append("var ").append(iterName).append(" = ");
    this.source.transpile(transpiler);
    if(srcType instanceof DictionaryType)
        transpiler.append(".entries();");
    else
        transpiler.append(".values();");
    transpiler.newLine();
    transpiler.append("while(").append(iterName).append(".hasNext()) {");
    transpiler = transpiler.newChildTranspiler();
    transpiler.indent();
    transpiler.context.registerValue(new Variable(this.v1, IntegerType.instance));
    transpiler.context.registerValue(new Variable(this.v2, elemType));
    transpiler.append("var ").append(this.v2.name).append(" = ").append(iterName).append(".next();").newLine();
    this.statements.transpile(transpiler);
    transpiler.append(this.v1.name).append("++;").newLine();
    transpiler.dedent();
    transpiler.flush();
    transpiler.append("}");
    transpiler.newLine();
};


exports.ForEachStatement = ForEachStatement;