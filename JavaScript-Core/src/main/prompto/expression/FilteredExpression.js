import Expression from './Expression.js'
import { IterableType, ListType, AnyType, BooleanType } from '../type/index.js'
import { NullReferenceError, InternalError } from '../error/index.js'

export default class FilteredExpression extends Expression {
 
    constructor(source, predicate) {
        super();
        this.source = source;
        this.predicate = predicate;
    }

    toString(dialect) {
        return this.source.toString() + " filtered with " + this.predicate.toString();
    }

    toDialect(writer) {
        this.predicate.filteredToDialect(writer, this.source);
    }

    check(context) {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof IterableType)) {
            context.problemListener.reportError(this, "Expecting an iterable type as data source !");
            return new ListType(AnyType.instance);
        }
        const itemType = sourceType.itemType;
        const arrow = this.predicate.toArrowExpression();
        const filterType = arrow.checkFilter(context, itemType);
        if (filterType != BooleanType.instance)
            context.problemListener.reportError(this, "Filtering expression must return a boolean !");
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
        const arrow = this.predicate.toArrowExpression();
        const filter = arrow.getFilter(context, itemType);
        return iterable.filter(filter)
    }

    declare(transpiler) {
        this.source.declare(transpiler);
        const listType = this.source.check(transpiler.context);
        const itemType = listType.itemType;
        const arrow = this.predicate.toArrowExpression();
        arrow.declareFilter(transpiler, itemType);
    }

    transpile(transpiler) {
        const listType = this.source.check(transpiler.context);
        const itemType = listType.itemType;
        this.source.transpile(transpiler);
        transpiler.append(".filtered((");
        const arrow = this.predicate.toArrowExpression();
        arrow.transpileFilter(transpiler, itemType);
        transpiler.append(")");
        if(transpiler.context.getClosestInstanceContext()!=null)
            transpiler.append(".bind(this)");
        transpiler.append(")");
        transpiler.flush();
    }

}

