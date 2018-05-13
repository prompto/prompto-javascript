var BaseSwitchStatement = require("./BaseSwitchStatement").BaseSwitchStatement;

function SwitchStatement(expression, switchCases, defaultCase) {
	BaseSwitchStatement.call(this, switchCases, defaultCase);
	this.expression = expression;
}

SwitchStatement.prototype = Object.create(BaseSwitchStatement.prototype);
SwitchStatement.prototype.constructor = SwitchStatement;

SwitchStatement.prototype.checkSwitchType = function(context) {
	return this.expression.check(context);
};

SwitchStatement.prototype.interpret = function(context) {
	var switchValue = this.expression.interpret(context);
	return this.interpretSwitch(context, switchValue, null);
};

SwitchStatement.prototype.toODialect = function(writer) {
    writer.append("switch(");
    this.expression.toDialect(writer);
    writer.append(") {\n");
    this.switchCases.forEach(function(switchCase) {
        switchCase.caseToODialect(writer);
    });
    if(this.defaultCase!=null) {
        writer.append("default:\n");
        writer.indent();
        this.defaultCase.toDialect(writer);
        writer.dedent();
    }
    writer.append("}\n");
}

SwitchStatement.prototype.toEDialect = function(writer) {
    writer.append("switch on ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.switchCases.forEach(function(switchCase) {
        switchCase.caseToEDialect(writer);
    });
    if(this.defaultCase!=null) {
        writer.append("otherwise:\n");
        writer.indent();
        this.defaultCase.toDialect(writer);
        writer.dedent();
    }
    writer.dedent();
}

SwitchStatement.prototype.toMDialect = function(writer) {
    writer.append("switch on ");
    this.expression.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.switchCases.forEach(function(switchCase) {
        switchCase.caseToPDialect(writer);
    });
    if(this.defaultCase!=null) {
        writer.append("otherwise:\n");
        writer.indent();
        this.defaultCase.toDialect(writer);
        writer.dedent();
    }
    writer.dedent();
};

SwitchStatement.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
    this.declareSwitch(transpiler);
};

SwitchStatement.prototype.transpile = function(transpiler) {
    transpiler.append("switch (")
    this.expression.transpile(transpiler);
    transpiler.append(") {")
    transpiler.newLine();
    this.switchCases.forEach(function(switchCase) {
        switchCase.transpile(transpiler);
    });
    if(this.defaultCase!=null) {
        transpiler.append("default:");
        transpiler.indent();
        this.defaultCase.transpile(transpiler);
        transpiler.dedent();
    }
    transpiler.append("}")
    transpiler.newLine();
    return true;
};

exports.SwitchStatement = SwitchStatement;