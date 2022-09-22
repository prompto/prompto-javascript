import QueryBuilder from '../store/QueryBuilder.ts'
import { MatchPredicate, AndPredicate, OrPredicate, NotPredicate } from './index.ts'

export default class MemQueryBuilder extends QueryBuilder {

    constructor() {
        super();
        this.orderBys = null;
        this.predicates = null;
        this.first = null;
        this.last = null;
        this.projection = null;
    }

    verify(fieldInfo, matchOp, value) {
        if(this.predicates==null)
            this.predicates = [];
        this.predicates.push(new MatchPredicate(fieldInfo, matchOp, value));
    }

    and() {
        const right = this.predicates.pop();
        const left = this.predicates.pop();
        this.predicates.push(new AndPredicate(left, right));
    }

    or() {
        const right = this.predicates.pop();
        const left = this.predicates.pop();
        this.predicates.push(new OrPredicate(left, right));
    }

    not() {
        const top = this.predicates.pop();
        this.predicates.push(new NotPredicate(top));
    }

    setFirst(value) {
        this.first = value;
    }

    setLast(value) {
        this.last = value;
    }

    build() {
        return {
            predicate: this.predicates==null ? null : this.predicates.pop(),
            first: this.first,
            last: this.last,
            projection: this.projection,
            orderBys : this.orderBys
        };
    }

    project(projection) {
        this.projection = projection;
    }

    addOrderByClause(info, descending) {
        if (this.orderBys == null)
            this.orderBys = [];
        this.orderBys.push({info: info, descending: descending});
    }
}
