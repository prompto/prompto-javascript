const Expression = require("./Expression").Expression;
const Variable = require("../runtime/Variable").Variable;
const IteratorType = require("../type/IteratorType").IteratorType;
const IterableValue = require("../value/IterableValue").IterableValue;
const UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
const ParenthesisExpression = require("./ParenthesisExpression").ParenthesisExpression;
const InternalError = require("../error/InternalError").InternalError;


class IteratorExpression extends Expression {
  
    constructor(name, source, expression) {
        super();
        this.name = name;
        this.source = source;
        this.expression = expression;
    }

    check(context) {
        const elemType = this.source.check(context).checkIterator(context, this.source);
        const child = context.newChildContext();
        child.registerValue(new Variable(this.name, elemType));
        const itemType = this.expression.check(child);
        return new IteratorType(itemType);
    }

    interpret(context) {
        const elemType = this.source.check(context).checkIterator(context, this.source);
        const items = this.source.interpret(context);
        const length = items.getMemberValue(context, "count", false);
        const iterator = this.getIterator(context, items);
        return new IterableValue(context, this.name, elemType, iterator, length, this.expression);
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        const sourceType = this.source.check(transpiler.context);
        sourceType.declareIterator(transpiler, this.name, this.expression);
    }

    transpile(transpiler) {
        const srcType = this.source.check(transpiler.context);
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
        const srcType = this.source.check(writer.context);
        writer = writer.newChildWriter();
        const resultType = srcType.checkIterator(writer.context, this.source);
        writer.context.registerValue(new Variable(this.name, resultType));
        writer.toDialect(this);
    }

    toMDialect(writer) {
        const expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ");
        writer.append(this.name.toString());
        writer.append(" in ");
        this.source.toDialect(writer);
    }

    toODialect(writer) {
        const expression = IteratorExpression.extractFromParenthesisIfPossible(this.expression);
        expression.toDialect(writer);
        writer.append(" for each ( ");
        writer.append(this.name.toString());
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(" )");
    }

    toEDialect(writer) {
        const expression = IteratorExpression.encloseInParenthesisIfRequired(this.expression);
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
            const enclosed = expression.expression;
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
