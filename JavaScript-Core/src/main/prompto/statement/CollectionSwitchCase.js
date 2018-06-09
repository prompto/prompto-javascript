var CollectionType = require("../type/ContainerType").ContainerType;
var SwitchCase = require("./SwitchCase").SwitchCase;

function CollectionSwitchCase(expression, statements) {
	SwitchCase.call(this, expression,statements);
	return this;
};

CollectionSwitchCase.prototype = Object.create(SwitchCase.prototype);
CollectionSwitchCase.prototype.constructor = CollectionSwitchCase;

CollectionSwitchCase.prototype.checkSwitchType = function(context, type) {
	var thisType = this.expression.check(context);
	if(thisType instanceof CollectionType) {
		thisType = thisType.itemType;
	}
	if(!type.isAssignableFrom(context, thisType)) {
		throw new SyntaxError("Cannot assign:" + thisType.name + " to:" + type.name);
	}
};

CollectionSwitchCase.prototype.matches = function(context, value) {
	var thisValue = this.expression.interpret(context);
	if(thisValue.hasItem) {
		return thisValue.hasItem(context, value);
	} else {
		return false;
	}
};


CollectionSwitchCase.prototype.caseToPDialect = function(writer) {
    this.caseToEDialect(writer);
}


CollectionSwitchCase.prototype.caseToODialect = function(writer) {
    writer.append("case in ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.caseToEDialect = function(writer) {
    writer.append("when in ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.catchToODialect = function(writer) {
    writer.append("catch (");
    this.expression.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("} ");
}


CollectionSwitchCase.prototype.catchToPDialect = function(writer) {
    writer.append("except in ");
    expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.catchToEDialect = function(writer) {
    caseToEDialect(writer); // no difference
}

CollectionSwitchCase.prototype.transpile = function(transpiler) {
    this.expression.expressions.forEach(function(expression) {
        transpiler.append("case ");
        expression.transpile(transpiler);
        transpiler.append(":").newLine();
    }, this);
    transpiler.indent(true);
    this.statements.transpile(transpiler);
    transpiler.append("break;").dedent();
};

exports.CollectionSwitchCase = CollectionSwitchCase;
