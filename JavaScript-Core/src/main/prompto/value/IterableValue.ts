import BaseValue from './BaseValue'
import {IntegerValue, IValue, ListValue} from './index'
import {IteratorType, IType} from '../type'
import {Context, Variable} from '../runtime'
import {IExpression} from "../expression";
import {Identifier} from "../grammar";
import IValueIterableWithCounts from "./IValueIterableWithCounts";

export default class IterableValue extends BaseValue<IValueIterableWithCounts> implements IValueIterableWithCounts {

    context: Context;
    name: Identifier;
    sourceType: IType;
    expression: IExpression

    constructor(context: Context, name: Identifier, sourceType: IType, iterable: IValueIterableWithCounts, expression: IExpression, resultType: IType) {
        // TODO should this not be IterableType ?
        super(new IteratorType(resultType), iterable);
        this.context = context;
        this.name = name;
        this.sourceType = sourceType;
        this.expression = expression;
    }

    isEmpty() {
        return this.value.count == 0;
    }

    length() {
        return this.value.count;
    }

    get count() {
        return this.value.count;
    }

    get totalCount() {
        return this.value.count;
    }

    getIterator(context: Context) {
        const iterator = this.value.getIterator(context);
        const child = this.context.newChildContext();
        child.registerInstance(new Variable(this.name, this.sourceType), true);
        return {
            hasNext: () => iterator.hasNext(),
            next: () => {
                child.setValue(this.name, iterator.next());
                return this.expression.interpret(child);
            }
        };
    }

    GetMemberValue(context: Context, member: Identifier) {
        if ("count" == member.name)
            return new IntegerValue(this.count);
        else
            return super.GetMemberValue(context, member);
    }

    filter(filter: (o: IValue) => boolean) {
        return this.toListValue().filter(filter);
    }

    toString() {
        return this.toListValue().toString();
    }

    toListValue() {
        const items = [];
        const iterator = this.getIterator(this.context);
        while(iterator.hasNext())
            items.push(iterator.next());
        return new ListValue(this.sourceType, false, items);
    }

    toSetValue() {
        return this.toListValue().toSetValue();
    }


}
