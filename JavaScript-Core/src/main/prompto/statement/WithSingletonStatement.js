var BaseStatement = require("./BaseStatement").BaseStatement;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;

function WithSingletonStatement(type, statements) {
    BaseStatement.call(this);
    this.type = type;
    this.statements = statements;
    return this;
};

WithSingletonStatement.prototype = Object.create(BaseStatement.prototype);
WithSingletonStatement.prototype.constructor = WithSingletonStatement;

WithSingletonStatement.prototype.check = function(context) {
    var instanceContext = context.newInstanceContext(null, this.type);
    var childContext = instanceContext.newChildContext();
    return this.statements.check(childContext, null);
};

WithSingletonStatement.prototype.interpret = function(context) {
    // TODO synchronize
    var instance = context.loadSingleton(this.type);
    var instanceContext = context.newInstanceContext(instance);
    var childContext = instanceContext.newChildContext();
    return this.statements.interpret(childContext);
};


WithSingletonStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

WithSingletonStatement.prototype.toEDialect = function(writer) {
    writer.append("with ");
    this.type.toDialect(writer);
    writer.append(", do:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

WithSingletonStatement.prototype.toODialect = function(writer) {
    writer.append("with (");
    this.type.toDialect(writer);
    writer.append(")");
    var oneLine = this.statements.length==1 && (this.statements[0] instanceof SimpleStatement);
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

WithSingletonStatement.prototype.toMDialect = function(writer) {
    writer.append("with ");
    this.type.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

exports.WithSingletonStatement = WithSingletonStatement;
