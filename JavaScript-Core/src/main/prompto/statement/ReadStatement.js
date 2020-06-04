var ReadAllExpression = require("../expression/ReadAllExpression").ReadAllExpression;
var Variable = require("../runtime/Variable").Variable;
var TextType = require("../type/TextType").TextType;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;

function ReadStatement(source, name, andThen) {
    ReadAllExpression.call(this, source);
    this.name = name;
    this.andThen = andThen;
    return this;
}

ReadStatement.prototype = Object.create(ReadAllExpression.prototype);
ReadStatement.prototype.constructor = ReadStatement;


ReadStatement.prototype.canReturn = function() {
    return false;
};


ReadStatement.prototype.isSimple = function() {
    return false;
};


ReadStatement.prototype.check = function (context) {
    ReadAllExpression.prototype.check.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, TextType.instance));
    this.andThen.check(context, null);
    return VoidType.instance;
};


ReadStatement.prototype.interpret = function(context) {
    var result = ReadAllExpression.prototype.interpret.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, TextType.instance));
    context.setValue(this.name, result);
    this.andThen.interpret(context);
    return null;
};


ReadStatement.prototype.toDialect = function(writer) {
    ReadAllExpression.prototype.toDialect.call(this, writer);
    writer.append(" then with ").append(this.name.name);
    if (writer.dialect === Dialect.O)
        writer.append(" {");
    else
        writer.append(":");
    writer = writer.newChildWriter();
    writer.context.registerValue(new Variable(this.name, TextType.instance));
    writer.newLine().indent();
    this.andThen.toDialect(writer);
    writer.dedent();
    if (writer.dialect === Dialect.O)
        writer.append("}").newLine();
};



ReadStatement.prototype.declare = function(transpiler) {
    ReadAllExpression.prototype.declare.call(this, transpiler);
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, TextType.instance));
    this.andThen.declare(transpiler);
};


ReadStatement.prototype.transpile = function(transpiler) {
    transpiler.append(this.source.name).append(".readFullyAsync(function(").append(this.name.name).append(") {").indent();
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, TextType.instance));
    this.andThen.transpile(transpiler);
    transpiler.dedent().append("}.bind(this));")
    transpiler.flush();
    return false;
};


ReadStatement.prototype.locateSectionAtLine = function(line) {
    return this;
};


exports.ReadStatement = ReadStatement;