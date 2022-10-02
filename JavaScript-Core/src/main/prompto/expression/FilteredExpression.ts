import BaseExpression from './BaseExpression'
import {IterableType, ListType, AnyType, BooleanType, IType} from '../type'
import { NullReferenceError, InternalError } from '../error'
import {IExpression, PredicateExpression} from "./index";
import {CodeWriter} from "../utils";
import {Dialect} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue, ListValue} from "../value";
import IValueIterable from "../value/IValueIterable";
import {IIterator} from "../intrinsic";

export default class FilteredExpression extends BaseExpression {

    source: IExpression | null;
    predicate: PredicateExpression;

    constructor(source: IExpression | null, predicate: PredicateExpression) {
        super();
        this.source = source;
        this.predicate = predicate;
    }

    toString(dialect?: Dialect) {
        return this.source!.toString() + " filtered with " + this.predicate.toString();
    }

    toDialect(writer: CodeWriter): void {
        this.predicate.filteredToDialect(writer, this.source!);
    }

    check(context: Context): IType {
        const sourceType = this.source!.check(context);
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

    interpretExpression(context: Context): IValue {
        const sourceType = this.source!.check(context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const sourceValue = this.source!.interpretExpression(context);
        if(!sourceValue) {
            throw new NullReferenceError();
        }
        if(sourceValue.isIterable()) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
            const iterable: IValueIterable = sourceValue.asIterable(context);
            const itemType = sourceType.itemType;
            const arrow = this.predicate.toArrowExpression();
            const filter = arrow.getFilter(context, itemType);
            return this.filter(itemType, iterable.getIterator(context), filter);
        } else
            throw new InternalError("Illegal fetch source: " + this.source!.toString());
    }

    private filter(itemType: IType, iterator: IIterator<IValue>, filter: (o: IValue) => boolean): ListValue {
        const items: IValue[] = [];
        while(iterator.hasNext()) {
            const value = iterator.next();
            if(filter(value))
                items.push(value);
        }
        return new ListValue(itemType, false, items);
    }

    declare(transpiler: Transpiler): void {
        this.source!.declare(transpiler);
        const sourceType = this.source!.check(transpiler.context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const itemType = sourceType.itemType;
        const arrow = this.predicate.toArrowExpression();
        arrow.declareFilter(transpiler, itemType);
    }

    transpile(transpiler: Transpiler): void {
        const sourceType = this.source!.check(transpiler.context);
        if(!(sourceType instanceof IterableType)) {
            throw new InternalError("Illegal source type: " + sourceType.name);
        }
        const itemType = sourceType.itemType;
        this.source!.transpile(transpiler);
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

