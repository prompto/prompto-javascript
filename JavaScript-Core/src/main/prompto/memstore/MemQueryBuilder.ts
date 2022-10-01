/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import IQueryBuilder from '../store/IQueryBuilder'
import { MatchPredicate, AndPredicate, OrPredicate, NotPredicate } from './index'
import {AttributeInfo, MatchOp} from "../store";
import MemPredicate from "./MemPredicate";
import MemOrderBy from "./MemOrderBy";
import MemQuery from "./MemQuery";


export default class MemQueryBuilder implements IQueryBuilder {

    predicates: MemPredicate[] | null;
    first_: any | null;
    last_: any | null;
    projection: string[] | null;
    orderBys: MemOrderBy[] | null;

    constructor() {
        this.orderBys = null;
        this.predicates = null;
        this.first_ = null;
        this.last_ = null;
        this.projection = null;
    }

    verify(fieldInfo: AttributeInfo, matchOp: MatchOp, value: any): IQueryBuilder {
        if (this.predicates == null)
            this.predicates = [];
        this.predicates.push(new MatchPredicate(fieldInfo, matchOp, value));
        return this;
    }

    and(): IQueryBuilder {
        const right = this.predicates!.pop()!;
        const left = this.predicates!.pop()!;
        this.predicates!.push(new AndPredicate(left, right));
        return this;
    }

    or(): IQueryBuilder {
        const right = this.predicates!.pop()!;
        const left = this.predicates!.pop()!;
        this.predicates!.push(new OrPredicate(left, right));
        return this;
    }

    not(): IQueryBuilder {
        const top = this.predicates!.pop()!;
        this.predicates!.push(new NotPredicate(top));
        return this;
    }

    first(value: any): IQueryBuilder {
        this.first_ = value;
        return this;
    }

    last(value: any): IQueryBuilder {
        this.last_ = value;
        return this;
    }

    build(): MemQuery {
        return {
            predicate: this.predicates ? this.predicates.pop()! : null,
            first: this.first_,
            last: this.last_,
            projection: this.projection,
            orderBys: this.orderBys
        };
    }

    project(projection: string[]): IQueryBuilder {
        this.projection = projection;
        return this;
    }

    orderBy(info: AttributeInfo, descending: boolean): IQueryBuilder {
        if (!this.orderBys)
            this.orderBys = [];
        this.orderBys.push({info: info, descending: descending});
        return this;
    }
}
