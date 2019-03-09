var FetchManyExpression = require("../expression/FetchManyExpression").FetchManyExpression;
var CursorType = require("../type/CursorType").CursorType;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;

function FetchManyStatement(typ, predicate, first, last, orderBy, name, stmts) {
    FetchManyExpression.call(this, typ, predicate, first, last, orderBy);
    this.name = name;
    this.stmts = stmts;
    return this;
}

FetchManyStatement.prototype = Object.create(FetchManyExpression.prototype);
FetchManyStatement.prototype.constructor = FetchManyStatement;


FetchManyStatement.prototype.canReturn = function() {
    return false;
};


FetchManyStatement.prototype.isSimple = function() {
    return false;
};


FetchManyStatement.prototype.check = function (context) {
    FetchManyExpression.prototype.check.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, new CursorType(this.typ)));
    this.stmts.check(context, null);
    return VoidType.instance;
};


FetchManyStatement.prototype.interpret = function(context) {
    var record = FetchManyExpression.prototype.interpret.call(this, context);
    context = context.newChildContext();
    context.registerValue(new Variable(this.name, new CursorType(this.typ)));
    context.setValue(this.name, record);
    this.stmts.interpret(context);
    return null;
};


FetchManyStatement.prototype.toDialect = function(writer) {
    FetchManyExpression.prototype.toDialect.call(this, writer);
    writer.append(" then with ").append(this.name.name);
    if (writer.dialect === Dialect.O)
        writer.append(" {");
    else
        writer.append(":");
    writer = writer.newChildWriter();
    writer.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
    writer.newLine().indent();
    this.stmts.toDialect(writer);
    writer.dedent();
    if (writer.dialect === Dialect.O)
        writer.append("}").newLine();
};



FetchManyStatement.prototype.declare = function(transpiler) {
    FetchManyExpression.prototype.declare.call(this, transpiler);
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
    this.stmts.declare(transpiler);
};


FetchManyStatement.prototype.transpile = function(transpiler) {
    transpiler.append("(function() {").indent();
    this.transpileQuery(transpiler);
    var mutable = this.typ ? this.typ.mutable : false;
    transpiler.append("DataStore.instance.fetchManyAsync(builder.build(), ").append(mutable).append(", function(").append(this.name.name).append(") {").indent();
    transpiler = transpiler.newChildTranspiler(transpiler.context);
    transpiler.context.registerValue(new Variable(this.name, new CursorType(this.typ)));
    this.stmts.transpile(transpiler);
    transpiler.dedent().append("}.bind(this));").dedent().append("}).bind(this)()");
    transpiler.flush();
    return false;
};


FetchManyStatement.prototype.locateSectionAtLine = function(line) {
    return this;
};


exports.FetchManyStatement = FetchManyStatement;