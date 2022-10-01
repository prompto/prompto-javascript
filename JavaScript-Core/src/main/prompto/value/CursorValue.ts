import BaseValue from './BaseValue'
import {IntegerValue, ListValue, IValue} from './index'
import {CursorType, CategoryType, IType} from '../type'
import { Identifier } from '../grammar'
import {Context} from "../runtime";
import {IStored} from "../store";
import IValueIterableWithCounts from "./IValueIterableWithCounts";
import {Cursor, IIterator} from "../intrinsic";

export default class CursorValue extends BaseValue<Cursor<IStored>> implements IValueIterableWithCounts {

    context: Context;
    itemType: IType;

    constructor(context: Context, itemType: IType, cursor: Cursor<IStored>) {
        super(new CursorType(itemType), cursor);
        this.context = context;
        this.itemType = itemType;
        this.mutable = itemType.mutable || false;
    }

    isEmpty() {
        return this.count == 0;
    }

    get count() {
        return this.value.count;
    }

    get totalCount() {
        return this.value.totalCount;
    }

    toString() {
        return this.toListValue().toString();
    }

    getIterator(context: Context): IIterator<IValue> {
        const iterator = this.value;
        return {
            hasNext: () => iterator.hasNext(),
            next: () => {
                const stored = iterator.next();
                const itemType = this.readItemType(stored);
                return itemType.newInstanceFromStored(this.context, stored);

            }
        };
    }

    readItemType(stored: IStored) {
        const categories = stored.category;
        const category = categories[categories.length-1];
        return new CategoryType(new Identifier(category), this.mutable);
    }

    GetMemberValue(context: Context, member: Identifier) {
        switch(member.name) {
            case "count":
                return new IntegerValue(this.count);
            case "totalCount":
                return new IntegerValue(this.totalCount);
            default:
                return super.GetMemberValue(context, member);
        }
    }

    filter(filter: (o: IValue) => boolean) {
        const result = new ListValue(this.itemType, false);
        const iter = this.getIterator(this.context);
        while(iter.hasNext()) {
            const current = iter.next();
            if (filter(current))
                result.add(current);
        }
        return result;
    }

    toListValue() {
        const result = new ListValue(this.itemType, false);
        const iter = this.getIterator(this.context);
        while(iter.hasNext())
            result.add(iter.next());
        return result;
    }

    toSetValue() {
        return this.toListValue().toSetValue();
    }
}
