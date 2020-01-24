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
    if(this.statements)
        return this.statements.check(context, null);
    else
        context.problemListener.reportSwitchMissingStatement(this);
};

SwitchCase.prototype.interpret = function(context) {
    return this.statements.interpret(context);
};

SwitchCase.prototype.declare = function(transpiler) {
    if(this.expression)
        this.expression.declare(transpiler);
    if(this.statements)
        this.statements.declare(transpiler);
};


SwitchCase.prototype.locateSectionAtLine = function(line) {
    return this.statements ? this.statements.locateSectionAtLine(line) : null;
};

exports.SwitchCase = SwitchCase;