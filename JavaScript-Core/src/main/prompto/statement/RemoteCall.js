var UnresolvedCall = require("./UnresolvedCall").UnresolvedCall;
var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;

function RemoteCall(caller, assignments, resultName, andThen) {
    UnresolvedCall.call(this, caller, assignments);
    this.resultName = resultName;
    this.andThen = andThen;
    return this;
}

RemoteCall.prototype  = Object.create(UnresolvedCall.prototype);
RemoteCall.prototype.constructor = RemoteCall;


RemoteCall.prototype.isSimple = function() {
    return false;
};


RemoteCall.prototype.toDialect = function(writer) {
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


RemoteCall.prototype.check = function(context) {
    var resultType = this.resolveAndCheck(context);
    context = context.newChildContext();
    if (this.resultName != null)
        context.registerValue(new Variable(this.resultName, resultType));
    this.andThen.check(context, VoidType.instance);
    return VoidType.instance;
};


RemoteCall.prototype.interpret = function(context) {
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


RemoteCall.prototype.declare = function(transpiler) {
    var resultType = this.resolveAndCheck(transpiler.context);
    this.resolved.declare(transpiler);
    var runner = require("../intrinsic/RemoteRunner").RemoteRunner;
    transpiler.require(runner);
    transpiler = transpiler.newChildTranspiler();
    if (this.resultName != null)
        transpiler.context.registerValue(new Variable(this.resultName, resultType));
    this.andThen.declare(transpiler);
};


RemoteCall.prototype.transpile = function(transpiler) {
    var resultType = this.resolveAndCheck(transpiler.context);
    transpiler = transpiler.append("RemoteRunner.run(function() {").indent().append("return ");
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


exports.RemoteCall = RemoteCall;
