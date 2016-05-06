var BaseStatement = require("./BaseStatement").BaseStatement;
var SimpleStatement = require("./SimpleStatement").SimpleStatement;

function WithResourceStatement(resource, statements) {
	BaseStatement.call(this);
	this.resource = resource;
	this.statements = statements;
}

WithResourceStatement.prototype = Object.create(BaseStatement.prototype);
WithResourceStatement.prototype.constructor = WithResourceStatement;

WithResourceStatement.prototype.check = function(context) {
	context = context.newResourceContext();
	this.resource.checkResource(context);
	return this.statements.check(context);
};

WithResourceStatement.prototype.interpret = function(context) {
	context = context.newResourceContext();
	try {
		this.resource.interpret(context);
		return this.statements.interpret(context);
	} finally {
		var res = context.getValue(this.resource.id);
		if(res.close) {
			res.close();
		}
	}
};

WithResourceStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

WithResourceStatement.prototype.toEDialect = function(writer) {
    writer.append("with ");
    this.resource.toDialect(writer);
    writer.append(", do:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
}

WithResourceStatement.prototype.toODialect = function(writer) {
    writer.append("with (");
    this.resource.toDialect(writer);
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
}

WithResourceStatement.prototype.toSDialect = function(writer) {
    writer.append("with ");
    this.resource.toDialect(writer);
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
}

exports.WithResourceStatement = WithResourceStatement;