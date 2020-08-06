const Expression = require("./Expression").Expression;
const BooleanType = require("../type/BooleanType").BooleanType;
const IterableType = require("../type/IterableType").IterableType;
const Variable = require("../runtime/Variable").Variable;
const InternalError = require("../error/InternalError").InternalError;
const NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
const ArrowExpression = require("../expression/ArrowExpression").ArrowExpression;
const IdentifierList = require("../grammar/IdentifierList").IdentifierList;
const ListType = require("../type/ListType").ListType;
const AnyType = require("../type/AnyType").AnyType;


class FilteredExpression extends Expression {
 
    constructor(itemId, source, predicate) {
        super();
        this.itemId = itemId;
        this.source = source;
        this.predicate = predicate;
    }

    toString(dialect) {
        return this.source.toString() + " filtered with " + this.itemId + " where " + this.predicate.toString();
    }

    check(context) {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof IterableType)) {
            context.problemListener.reportError(this, "Expecting an iterable type as data source !");
            return new ListType(AnyType.instance);
        }
        const itemType = sourceType.itemType;
        if(this.itemId!=null) {
            const child = context.newChildContext();
            child.registerValue(new Variable(this.itemId, itemType));
            const filterType = this.predicate.check(child);
            if (filterType != BooleanType.instance) {
                context.problemListener.reportError(this, "Filtering expression must return a boolean !");
            }
        } else if(this.predicate instanceof ArrowExpression) {
            // TODO
        } else
            context.problemListener.reportError(this, "Expected an arrow expression!");
        return new ListType(itemType);
    }

    interpret(context) {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const iterable = this.source.interpret(context);
        if(iterable==null) {
            throw new NullReferenceError();
        }
        if(!iterable.filter) {
            throw new InternalError("Illegal fetch source: " + this.source);
        }
        const itemType = sourceType.itemType;
        const arrow = this.toArrowExpression();
        const filter = arrow.getFilter(context, itemType);
        return iterable.filter(filter)
    }

    toArrowExpression() {
        if(this.itemId!=null) {
            const arrow = new ArrowExpression(new IdentifierList(this.itemId), null, null);
            arrow.setExpression(this.predicate);
            return arrow;
        } else if(this.predicate instanceof ArrowExpression)
            return this.predicate;
        else
            throw new SyntaxError("Not a valid filter!");
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        const listType = this.source.check(transpiler.context);
        const itemType = listType.itemType;
        const arrow = this.toArrowExpression();
        arrow.declareFilter(transpiler, itemType);
    }

    transpile(transpiler) {
        const listType = this.source.check(transpiler.context);
        const itemType = listType.itemType;
        this.source.transpile(transpiler);
        transpiler.append(".filtered((");
        const arrow = this.toArrowExpression();
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
        if(transpiler.context.getClosestInstanceContext()!=null)
            transpiler.append(".bind(this)");
        transpiler.append(")");
        transpiler.flush();
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        if (this.itemId)
            this.toEDialectExplicit(writer);
        else if (this.predicate instanceof ArrowExpression)
            this.predicate.filterToDialect(writer, this.source);
        else
            throw new SyntaxError("Expected an arrow expression!");
    }

    toEDialectExplicit(writer) {
        writer = writer.newChildWriter();
        const sourceType = this.source.check(writer.context);
        const itemType = sourceType.itemType;
        writer.context.registerValue(new Variable(this.itemId, itemType));
        this.source.toDialect(writer);
        writer.append(" filtered with ");
        writer.append(this.itemId.name);
        writer.append(" where ");
        this.predicate.toDialect(writer);
    }

    toODialect(writer) {
        if (this.itemId)
            this.toODialectExplicit(writer);
        else if (this.predicate instanceof ArrowExpression)
            this.predicate.filterToDialect(writer, this.source);
        else
            throw new SyntaxError("Expected an arrow expression!");
    }

    toODialectExplicit(writer) {
        writer = writer.newChildWriter();
        const sourceType = this.source.check(writer.context);
        const itemType = sourceType.itemType;
        writer.context.registerValue(new Variable(this.itemId, itemType));
        writer.append("filtered (");
        this.source.toDialect(writer);
        writer.append(") with (");
        writer.append(this.itemId.name);
        writer.append(") where (");
        this.predicate.toDialect(writer);
        writer.append(")");
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }
}

exports.FilteredExpression = FilteredExpression;
