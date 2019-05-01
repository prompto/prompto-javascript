var Section = require("../parser/Section").Section;
var ReturnStatement = require("../statement/ReturnStatement").ReturnStatement;
var StatementList = require("../statement/StatementList").StatementList;
var Variable = require("../runtime/Variable").Variable;
var IntegerValue = require("../value/IntegerValue").IntegerValue;


function ArrowExpression(args, argsSuite, arrowSuite) {
    Section.call(this);
    this.args = args;
    this.argsSuite = argsSuite;
    this.arrowSuite = arrowSuite;
    this.statements = null;
    return this;
}

ArrowExpression.prototype = Object.create(Section.prototype);
ArrowExpression.prototype.constructor = ArrowExpression;


ArrowExpression.prototype.check = function(context) {
    throw new Error("Unsupported operation");
};


ArrowExpression.prototype.interpret = function(context) {
    throw new Error("Unsupported operation");
};


ArrowExpression.prototype.toDialect = function(writer) {
    this.argsToDialect(writer);
    writer.append(argsSuite);
    writer.append("=>");
    writer.append(arrowSuite);
    this.bodyToDialect(writer);
};


ArrowExpression.prototype.bodyToDialect = function(writer) {
    if(this.statements.length==1 && this.statements[0] instanceof ReturnStatement)
        this.statements[0].expression.toDialect(writer);
    else {
        writer.append("{").newLine().indent();
        this.statements.toDialect(writer);
        writer.newLine().dedent().append("}").newLine();
    }
};


ArrowExpression.prototype.argsToDialect = function(writer) {
    if(args==null || args.isEmpty())
        writer.append("()");
    else if(args.size()==1)
        writer.append(args.getFirst().toString());
    else {
        writer.append("(");
        args.toDialect(writer, false);
        writer.append(")");
    }
};


ArrowExpression.prototype.setExpression = function(expression) {
    var stmt = new ReturnStatement(expression);
    this.statements = new StatementList(stmt);
};


ArrowExpression.prototype.registerArrowArgs = function(context, itemType) {
    this.args.forEach(function(arg) {
        var param = new Variable(arg, itemType);
        context.registerValue(param);
    });
    return context;
};


ArrowExpression.prototype.getNativeSortedComparator = function(context, itemType, descending) {
    switch(this.args.length) {
        case 1:
            return this.getNativeSortedComparator1Arg(context, itemType, descending);
        case 2:
            return this.getNativeSortedComparator2Args(context, itemType, descending);
        default:
            throw new Error("sorted arrow methods only support 1 or 2 arguments")
    }
};


ArrowExpression.prototype.getNativeSortedComparator1Arg = function(context, itemType, descending) {
    var cmp = function(o1, o2) {
        var local = this.registerArrowArgs(context.newLocalContext(), itemType);
        local.setValue(this.args[0], o1);
        var key1 = this.statements.interpret(local);
        local.setValue(this.args[0], o2);
        var key2 = this.statements.interpret(local);
        return descending ? key2.compareToValue(context, key1) : key1.compareToValue(context, key2);
    };
    return cmp.bind(this);
};


ArrowExpression.prototype.getNativeSortedComparator2Args = function(context, itemType, descending) {
    var cmp = function(o1, o2) {
        var local = this.registerArrowArgs(context.newLocalContext(), itemType);
        local.setValue(this.args[0], o1);
        local.setValue(this.args[1], o2);
        var result = this.statements.interpret(local);
        if(!(result instanceof IntegerValue))
            throw new SyntaxError("Expecting an Integer as result of key body!");
        return descending ? -result.value : result.value;
    };
    return cmp.bind(this);
};


ArrowExpression.prototype.transpileNativeSortedComparator = function(transpiler, itemType, descending) {
    switch(this.args.length) {
        case 1:
            this.transpileNativeSortedComparator1Arg(transpiler, itemType, descending);
            break;
        case 2:
            this.transpileNativeSortedComparator2Args(transpiler, itemType, descending);
            break;
        default:
            throw new SyntaxError("Expecting 1 or 2 parameters only!");
    }
};


ArrowExpression.prototype.transpileNativeSortedComparator1Arg = function(transpiler, itemType, descending) {
    transpiler = transpiler.newLocalTranspiler();
    this.registerArrowArgs(transpiler.context, itemType);
    transpiler.append("function(o1, o2) { ");
    transpiler.append("var $key = function(");
    transpiler.append(this.args[0]);
    transpiler.append(") { ");
    this.statements.transpile(transpiler);
    transpiler.append(" }; ");
    transpiler.append("o1 = $key(o1); ");
    transpiler.append("o2 = $key(o2); ");
    if(descending)
        transpiler.append("return o1 === o2 ? 0 : o1 > o2 ? -1 : 1;");
    else
        transpiler.append("return o1 === o2 ? 0 : o1 > o2 ? 1 : -1;");
    transpiler.append(" }");
    transpiler.flush();
};


ArrowExpression.prototype.transpileNativeSortedComparator2Args = function(transpiler, itemType, descending) {
    transpiler = transpiler.newLocalTranspiler();
    this.registerArrowArgs(transpiler.context, itemType);
    if(descending) {
        transpiler.append("function(");
        transpiler.append(this.args.join(", "));
        transpiler.append(") { return -(");
    }
    transpiler.append("function(");
    transpiler.append(this.args.join(", "));
    transpiler.append(") {");
    this.statements.transpile(transpiler);
    transpiler.append("}");
    if(descending) {
        transpiler.append(")(");
        transpiler.append(this.args.join(", "));
        transpiler.append("); }");
    }
    transpiler.flush();
};

exports.ArrowExpression = ArrowExpression;