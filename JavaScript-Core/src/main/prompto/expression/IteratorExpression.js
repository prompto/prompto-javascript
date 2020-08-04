var Expression = require("./Expression").Expression;
var Variable = require("../runtime/Variable").Variable;
var IteratorType = require("../type/IteratorType").IteratorType;
var IterableValue = require("../value/IterableValue").IterableValue;
var UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
var ParenthesisExpression = require("./ParenthesisExpression").ParenthesisExpression;
var InternalError = require("../error/InternalError").InternalError;


class IteratorExpression extends Expression {
  
    constructor(name, source, expression) {
        super();
        this.name = name;
        this.source = source;
        this.expression = expression;
    }

    check(context) {
        var elemType = this.source.check(context).checkIterator(context, this.source);
        var child = context.newChildContext();
        child.registerValue(new Variable(this.name, elemType));
        var itemType = this.expression.check(child);
        return new IteratorType(itemType);
    }

    interpret(context) {
        var elemType = this.source.check(context).checkIterator(context, this.source);
        var items = this.source.interpret(context);
        var length = items.getMemberValue(context, "count", false);
        var iterator = this.getIterator(context, items);
        return new IterableValue(context, this.name, elemType, iterator, length, this.expression);
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        var sourceType = this.source.check(transpiler.context);
        sourceType.declareIterator(transpiler, this.name, this.expression);
    }

    transpile(transpiler) {
        var srcType = this.source.check(transpiler.context);
        /*var resultType = */srcType.checkIterator(transpiler.context, this.source);
        this.source.transpile(transpiler);
        transpiler = transpiler.newChildTranspiler()
        srcType.transpileIterator(transpiler, this.name, this.expression);
        transpiler.flush()
    }

    getIterator(context, src) {
        if (src.getIterator)
            return src.getIterator();
        else
            throw new InternalError("Should never get there!");
    }

    toDialect(writer) {
        var srcType = this.source.check(writer.context);
        writer = writer.newChildWriter();
        var resultType = srcType.checkIterator(writer.context, this.source);
        writer.context.registerValue(new Variable(this.name, resultType));
        writer.toDialect(this);
    }

    toMDialect(writer) {
        var expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ");
        writer.append(this.name.toString());
        writer.append(" in ");
        this.source.toDialect(writer);
    }

    toODialect(writer) {
        var expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ( ");
        writer.append(this.name.toString());
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(" )");
    }

    toEDialect(writer) {
        var expression = IteratorExpression.encloseInParenthesisIfRequired(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ");
        writer.append(this.name.toString());
        writer.append(" in ");
        this.source.toDialect(writer);
    }

    static encloseInParenthesisIfRequired(expression) {
        if(IteratorExpression.mustBeEnclosedInParenthesis(expression))
            return new ParenthesisExpression(expression);
        else
            return expression;
    }

    static extractFromParenthesisIfPossible(expression) {
        if(expression instanceof ParenthesisExpression) {
            var enclosed = expression.expression;
            if(IteratorExpression.mustBeEnclosedInParenthesis(enclosed))
                return enclosed;
        }
        return expression;
    }

    static mustBeEnclosedInParenthesis(expression) {
        return expression instanceof UnresolvedCall;
    }
}


exports.IteratorExpression = IteratorExpression;
