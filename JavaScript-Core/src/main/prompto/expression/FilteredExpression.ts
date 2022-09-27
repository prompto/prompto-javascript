import BaseExpression from './BaseExpression'
import {IterableType, ListType, AnyType, BooleanType, IType} from '../type'
import { NullReferenceError, InternalError } from '../error'
import {IExpression, PredicateExpression} from "./index";
import {CodeWriter} from "../utils";
import {Dialect} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IIterable, IValue} from "../value";

export default class FilteredExpression extends BaseExpression {

    source: IExpression;
    predicate: PredicateExpression;

    constructor(source: IExpression, predicate: PredicateExpression) {
        super();
        this.source = source;
        this.predicate = predicate;
    }

    toString(dialect?: Dialect) {
        return this.source.toString() + " filtered with " + this.predicate.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.predicate.filteredToDialect(writer, this.source);
    }

    check(context: Context): IType {
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

    interpret(context: Context): IValue {
        const sourceType = this.source.check(context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const sourceValue = this.source.interpret(context);
        if(!sourceValue) {
            throw new NullReferenceError();
        }
        if(!sourceValue.isIterable()) {
            throw new InternalError("Illegal fetch source: " + this.source.toString());
        }
        const itemType = sourceType.itemType;
        const arrow = this.predicate.toArrowExpression();
        const filter = arrow.getFilter(context, itemType);
        return (sourceValue as unknown as IIterable<IValue>).filter(filter)
    }

    declare(transpiler: Transpiler): void {
        this.source.declare(transpiler);
        const sourceType = this.source.check(transpiler.context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const itemType = sourceType.itemType;
        const arrow = this.predicate.toArrowExpression();
        arrow.declareFilter(transpiler, itemType);
    }

    transpile(transpiler: Transpiler): void {
        const sourceType = this.source.check(transpiler.context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const itemType = sourceType.itemType;
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

