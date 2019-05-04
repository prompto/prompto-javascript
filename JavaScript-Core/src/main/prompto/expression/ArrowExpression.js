var Section = require("../parser/Section").Section;
var Dialect = require("../parser/Dialect").Dialect;
var ReturnStatement = require("../statement/ReturnStatement").ReturnStatement;
var StatementList = require("../statement/StatementList").StatementList;
var Variable = require("../runtime/Variable").Variable;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var BooleanValue = require("../value/BooleanValue").BooleanValue;


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
    writer.append(this.argsSuite);
    writer.append("=>");
    writer.append(this.arrowSuite);
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
    if(this.args==null || this.args.length==0)
        writer.append("()");
    else if(this.args.length==1)
        writer.append(this.args[0].name);
    else {
        writer.append("(");
        writer.append(this.args.join(", "));
        writer.append(")");
    }
};


ArrowExpression.prototype.filterToDialect = function(writer, source) {
    if(this.args==null || this.args.length==0)
        throw new SyntaxError("Expecting 1 parameter only!");
    var sourceType = source.check(writer.context);
    var itemType = sourceType.itemType;
    writer = writer.newChildWriter();
    writer.context.registerValue(new Variable(this.args[0], itemType));
    switch(writer.dialect) {
        case Dialect.E:
        case Dialect.M:
            source.toDialect(writer);
            writer.append(" filtered where ");
            this.toDialect(writer);
            break;
        case Dialect.O:
            writer.append("filtered (");
            source.toDialect(writer);
            writer.append(") where (");
            this.toDialect(writer);
            writer.append(")");
            break;
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


ArrowExpression.prototype.getFilter = function(context, itemType) {
    var local = this.registerArrowArgs(context.newLocalContext(), itemType);
    var filter = function(o) {
        local.setValue(this.args[0], o);
        var result = this.statements.interpret(local);
        if(result instanceof BooleanValue)
            return result.value;
        else
            throw new SyntaxError("Expecting a Boolean result!");
    };
    return filter.bind(this);
};


ArrowExpression.prototype.declareFilter = function(transpiler, itemType) {
    if(this.args.length!=1)
        throw new SyntaxError("Expecting 1 parameter only!");
    transpiler = transpiler.newChildTranspiler(null);
    transpiler.context.registerValue(new Variable(this.args[0], itemType));
    this.statements.declare(transpiler);
};


ArrowExpression.prototype.transpileFilter = function(transpiler, itemType) {
    if(this.args.length!=1)
        throw new SyntaxError("Expecting 1 parameter only!");
    transpiler = transpiler.newChildTranspiler(null);
    transpiler.context.registerValue(new Variable(this.args[0], itemType));
    transpiler.append("function(").append(this.args[0]).append(") { ");
    this.statements.transpile(transpiler);
    transpiler.append(" }");
    transpiler.flush();
};

ArrowExpression.prototype.getSortedComparator = function(context, itemType, descending) {
    switch(this.args.length) {
        case 1:
            return this.getSortedComparator1Arg(context, itemType, descending);
        case 2:
            return this.getSortedComparator2Args(context, itemType, descending);
        default:
            throw new Error("sorted arrow methods only support 1 or 2 arguments")
    }
};


ArrowExpression.prototype.getSortedComparator1Arg = function(context, itemType, descending) {
    var local = this.registerArrowArgs(context.newLocalContext(), itemType);
    var cmp = function(o1, o2) {
        local.setValue(this.args[0], o1);
        var key1 = this.statements.interpret(local);
        local.setValue(this.args[0], o2);
        var key2 = this.statements.interpret(local);
        return descending ? key2.compareToValue(context, key1) : key1.compareToValue(context, key2);
    };
    return cmp.bind(this);
};


ArrowExpression.prototype.getSortedComparator2Args = function(context, itemType, descending) {
    var local = this.registerArrowArgs(context.newLocalContext(), itemType);
    var cmp = function(o1, o2) {
        local.setValue(this.args[0], o1);
        local.setValue(this.args[1], o2);
        var result = this.statements.interpret(local);
        if(!(result instanceof IntegerValue))
            throw new SyntaxError("Expecting an Integer as result of key body!");
        return descending ? -result.value : result.value;
    };
    return cmp.bind(this);
};


ArrowExpression.prototype.transpileSortedComparator = function(transpiler, itemType, descending) {
    switch(this.args.length) {
        case 1:
            this.transpileSortedComparator1Arg(transpiler, itemType, descending);
            break;
        case 2:
            this.transpileSortedComparator2Args(transpiler, itemType, descending);
            break;
        default:
            throw new SyntaxError("Expecting 1 or 2 parameters only!");
    }
};


ArrowExpression.prototype.transpileSortedComparator1Arg = function(transpiler, itemType, descending) {
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


ArrowExpression.prototype.transpileSortedComparator2Args = function(transpiler, itemType, descending) {
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