var SwitchCase = require("./SwitchCase").SwitchCase;
var VoidType = require("../type/VoidType").VoidType;

function AtomicSwitchCase(expression, statements) {
    SwitchCase.call(this, expression, statements);
    return this;
}

AtomicSwitchCase.prototype = Object.create(SwitchCase.prototype);
AtomicSwitchCase.prototype.constructor = AtomicSwitchCase;

AtomicSwitchCase.prototype.checkSwitchType = function(context, type) {
    var thisType = this.expression ? this.expression.check(context) : VoidType.instnce;
    if(!type.isAssignableFrom(context, thisType)) {
        context.problemListener.reportIncompatibleTypes(this, type, thisType);
    }
};

AtomicSwitchCase.prototype.matches = function(context, value) {
    var thisValue = this.expression.interpret(context);
    return value.equals(thisValue);
};


AtomicSwitchCase.prototype.caseToMDialect = function(writer) {
    this.caseToEDialect(writer);
};


AtomicSwitchCase.prototype.caseToODialect = function(writer) {
    writer.append("case ");
    this.expression && this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToODialect = function(writer) {
    writer.append("catch (");
    this.expression && this.expression.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent().append("} ");
};


AtomicSwitchCase.prototype.caseToEDialect = function(writer) {
    writer.append("when ");
    this.expression && this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToPDialect = function(writer) {
    writer.append("except ");
    this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
};


AtomicSwitchCase.prototype.catchToEDialect = function(writer) {
    this.caseToEDialect(writer); // no difference
};


AtomicSwitchCase.prototype.transpile = function(transpiler) {
    transpiler.append("case ");
    this.expression && this.expression.transpile(transpiler);
    transpiler.append(":").indent();
    this.statements && this.statements.transpile(transpiler);
    transpiler.append("break;").dedent();
};

AtomicSwitchCase.prototype.transpileError = function(transpiler) {
    transpiler.append('case "');
    this.expression && this.expression.transpile(transpiler);
    transpiler.append('":');
    transpiler.indent();
    this.statements && this.statements.transpile(transpiler);
    transpiler.append("break;");
    transpiler.dedent();
};

exports.AtomicSwitchCase = AtomicSwitchCase;
