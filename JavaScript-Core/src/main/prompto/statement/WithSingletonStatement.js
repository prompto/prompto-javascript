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
    var instanceContext = context.newInstanceContext(null, this.type, true);
    var childContext = instanceContext.newChildContext();
    return this.statements.check(childContext, null);
};

WithSingletonStatement.prototype.interpret = function(context) {
    // TODO synchronize
    var instance = context.loadSingleton(this.type);
    var instanceContext = context.newInstanceContext(instance, null, true);
    var childContext = instanceContext.newChildContext();
    return this.statements.interpret(childContext);
};


WithSingletonStatement.prototype.declare = function(transpiler) {
    this.type.declare(transpiler);
    transpiler = transpiler.newInstanceTranspiler(this.type);
    transpiler = transpiler.newChildTranspiler();
    return this.statements.declare(transpiler);
};

WithSingletonStatement.prototype.transpile = function(transpiler) {
    var instance = transpiler.newInstanceTranspiler(this.type);
    var child = instance.newChildTranspiler();
    this.statements.transpile(child);
    child.flush();
    instance.flush();
    return true;
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
    var oneLine = this.statements.length==1 && this.statements[0].isSimple();
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
