var CollectionType = require("../type/ContainerType").ContainerType;
var SwitchCase = require("./SwitchCase").SwitchCase;
var VoidType = require("../type/VoidType").VoidType;

function CollectionSwitchCase(expression, statements) {
    SwitchCase.call(this, expression,statements);
    return this;
}

CollectionSwitchCase.prototype = Object.create(SwitchCase.prototype);
CollectionSwitchCase.prototype.constructor = CollectionSwitchCase;

CollectionSwitchCase.prototype.checkSwitchType = function(context, type) {
    var thisType = this.expression ? this.expression.check(context) : VoidType.instance;
    if(thisType instanceof CollectionType) {
        thisType = thisType.itemType;
    }
    if(!type.isAssignableFrom(context, thisType)) {
        context.problemListener.reportIncompatibleTypes(this, type, thisType);
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


CollectionSwitchCase.prototype.caseToMDialect = function(writer) {
    this.caseToEDialect(writer);
}


CollectionSwitchCase.prototype.caseToODialect = function(writer) {
    writer.append("case in ");
    this.expression && this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.caseToEDialect = function(writer) {
    writer.append("when in ");
    this.expression && this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.catchToODialect = function(writer) {
    writer.append("catch (");
    this.expression && this.expression.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent().append("} ");
}


CollectionSwitchCase.prototype.catchToMDialect = function(writer) {
    writer.append("except in ");
    this.expression && this.expression.toDialect(writer);
    writer.append(":").newLine().indent();
    this.statements && this.statements.toDialect(writer);
    writer.dedent();
}


CollectionSwitchCase.prototype.catchToEDialect = function(writer) {
    this.caseToEDialect(writer); // no difference
}

CollectionSwitchCase.prototype.transpile = function(transpiler) {
    this.expression && this.expression.expressions.forEach(function(expression) {
        transpiler.append("case ");
        expression.transpile(transpiler);
        transpiler.append(":").newLine();
    }, this);
    transpiler.indent(true);
    this.statements && this.statements.transpile(transpiler);
    transpiler.append("break;").dedent();
};

exports.CollectionSwitchCase = CollectionSwitchCase;
