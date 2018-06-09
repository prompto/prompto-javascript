var SwitchCase = require("./SwitchCase").SwitchCase;

function AtomicSwitchCase(expression, statements) {
	SwitchCase.call(this, expression, statements);
	return this;
};

AtomicSwitchCase.prototype = Object.create(SwitchCase.prototype);
AtomicSwitchCase.prototype.constructor = AtomicSwitchCase;

AtomicSwitchCase.prototype.checkSwitchType = function(context, type) {
	var thisType = this.expression.check(context);
	if(!type.isAssignableFrom(context, thisType)) {
		throw new SyntaxError("Cannot assign:" + thisType.name + " to:" + type.name);
	}
};

AtomicSwitchCase.prototype.matches = function(context, value) {
	var thisValue = this.expression.interpret(context);
	return value.equals(thisValue);
};


AtomicSwitchCase.prototype.caseToPDialect = function(writer) {
    this.caseToEDialect(writer);
};


AtomicSwitchCase.prototype.caseToODialect = function(writer) {
    writer.append("case ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToODialect = function(writer) {
    writer.append("catch (");
    this.expression.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("} ");
};


AtomicSwitchCase.prototype.caseToEDialect = function(writer) {
    writer.append("when ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToPDialect = function(writer) {
    writer.append("except ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToEDialect = function(writer) {
    this.caseToEDialect(writer); // no difference
};


AtomicSwitchCase.prototype.transpile = function(transpiler) {
    transpiler.append("case ");
    this.expression.transpile(transpiler);
    transpiler.append(":").indent();
    this.statements.transpile(transpiler);
    transpiler.append("break;").dedent();
};

AtomicSwitchCase.prototype.transpileError = function(transpiler) {
    transpiler.append('case "');
    this.expression.transpile(transpiler);
    transpiler.append('":');
    transpiler.indent();
    this.statements.transpile(transpiler);
    transpiler.append("break;");
    transpiler.dedent();
};

exports.AtomicSwitchCase = AtomicSwitchCase;
