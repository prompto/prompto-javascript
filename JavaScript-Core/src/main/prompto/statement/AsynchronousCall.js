var UnresolvedCall = require("./UnresolvedCall").UnresolvedCall;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;

function AsynchronousCall(caller, assignments, resultName, andThen) {
    UnresolvedCall.call(this, caller, assignments);
    this.resultName = resultName;
    this.andThen = andThen;
    return this;
}

AsynchronousCall.prototype  = Object.create(UnresolvedCall.prototype);
AsynchronousCall.prototype.constructor = AsynchronousCall;


AsynchronousCall.prototype.isSimple = function() {
    return false;
};


AsynchronousCall.prototype.toDialect = function(writer) {
    var resultType = this.resolveAndCheck(writer.context);
    UnresolvedCall.prototype.toDialect.call(this, writer);
    writer.append(" then");
    writer = writer.newChildWriter();
    if(this.resultName!=null) {
        writer.append(" with ").append(this.resultName.name);
        writer.context.registerValue(new Variable(this.resultName, resultType));
    }
    if (writer.dialect == Dialect.O)
        writer.append(" {");
    else
        writer.append(":");
    writer = writer.newLine().indent();
    this.andThen.toDialect(writer);
    writer = writer.dedent();
    if (writer.dialect == Dialect.O)
        writer.append("}");
};


AsynchronousCall.prototype.check = function(context) {
    var resultType = this.resolveAndCheck(context);
    context = context.newChildContext();
    if (this.resultName != null)
        context.registerValue(new Variable(this.resultName, resultType));
    this.andThen.check(context, VoidType.instance);
    return VoidType.instance;
};


AsynchronousCall.prototype.interpret = function(context) {
    var resultType = this.resolveAndCheck(context);
    var resultValue = UnresolvedCall.prototype.interpret.call(this, context);
    context = context.newChildContext();
    if (this.resultName != null) {
        context.registerValue(new Variable(this.resultName, resultType));
        context.setValue(this.resultName, resultValue);
    }
    this.andThen.interpret(context)
    return null;
};


AsynchronousCall.prototype.declare = function(transpiler) {
    var resultType = this.resolveAndCheck(transpiler.context);
    this.resolved.declare(transpiler);
    var execute = require("../intrinsic/Async").execute;
    transpiler.require(execute);
    transpiler = transpiler.newChildTranspiler();
    if (this.resultName != null)
        transpiler.context.registerValue(new Variable(this.resultName, resultType));
    this.andThen.declare(transpiler);
};


AsynchronousCall.prototype.transpile = function(transpiler) {
    var resultType = this.resolveAndCheck(transpiler.context);
    transpiler = transpiler.append("execute(function() {").indent().append("return ");
    this.resolved.transpile(transpiler);
    transpiler.dedent().append("}, function(");
    if (this.resultName != null)
        transpiler.append(this.resultName.name);
    transpiler.append(") {").indent();
    transpiler = transpiler.newChildTranspiler();
    if (this.resultName != null)
        transpiler.context.registerValue(new Variable(this.resultName, resultType));
    this.andThen.transpile(transpiler);
    transpiler.dedent().append("})");
    transpiler.flush();
};


exports.AsynchronousCall = AsynchronousCall;
