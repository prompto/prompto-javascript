var Section = require("../parser/Section").Section;

function SwitchCase(expression, statements) {
	Section.call(this);
	this.expression = expression;
	this.statements = statements;
	return this;
}


SwitchCase.prototype  = Object.create(Section.prototype);
SwitchCase.prototype.constructor = SwitchCase;

SwitchCase.prototype.checkReturnType = function(context) {
	return this.statements.check(context, null);
};

SwitchCase.prototype.interpret = function(context) {
	return this.statements.interpret(context);
};

SwitchCase.prototype.declare = function(transpiler) {
    if(this.expression)
        this.expression.declare(transpiler);
    this.statements.declare(transpiler);
};


SwitchCase.prototype.locateSectionAtLine = function(line) {
    return this.statements.locateSectionAtLine(line);
};

exports.SwitchCase = SwitchCase;