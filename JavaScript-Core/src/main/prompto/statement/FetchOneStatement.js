var FetchOneExpression = require("../expression/FetchOneExpression").FetchOneExpression;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;

function FetchOneStatement(typ, predicate, name, stmts) {
    FetchOneExpression.call(this, typ, predicate);
    this.name = name;
    this.stmts = stmts;
    return this;
}

FetchOneStatement.prototype = Object.create(FetchOneExpression.prototype);
FetchOneStatement.prototype.constructor = FetchOneStatement;

FetchOneStatement.prototype.canReturn = function() {
    return false;
};


FetchOneStatement.prototype.isSimple = function() {
    return false;
};


FetchOneStatement.prototype.check = function (context) {
    FetchOneExpression.prototype.check.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, this.typ));
    this.stmts.check(context, null);
    return VoidType.instance;
};


FetchOneStatement.prototype.interpret = function(context) {
    var record = FetchOneExpression.prototype.interpret.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, this.typ));
    context.setValue(this.name, record);
    this.stmts.interpret(context);
    return null;
};


FetchOneStatement.prototype.toDialect = function(writer) {
    FetchOneExpression.prototype.toDialect.call(this, writer);
    writer.append(" then with ").append(this.name.name);
    if (writer.dialect === Dialect.O)
        writer.append(" {");
    else
        writer.append(":");
    writer = writer.newChildWriter();
    writer.context.registerValue(new Variable(this.name, this.typ));
    writer.newLine().indent();
    this.stmts.toDialect(writer);
    writer.dedent();
    if (writer.dialect === Dialect.O)
        writer.append("}");
};


FetchOneStatement.prototype.declare = function(transpiler) {
    FetchOneExpression.prototype.declare.call(this, transpiler);
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, this.typ));
    this.stmts.declare(transpiler);
};


FetchOneStatement.prototype.transpile = function(transpiler) {
    transpiler.append("(function() {").indent();
    this.transpileQuery(transpiler);
    transpiler.append("DataStore.instance.fetchOneAsync(builder.build(), function(stored) {").indent();
    this.transpileConvert(transpiler, this.name.name);
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, this.typ));
    this.stmts.transpile(transpiler);
    transpiler.dedent().append("}.bind(this));").dedent().append("})()");
    transpiler.flush();
    return false;
};

exports.FetchOneStatement = FetchOneStatement;