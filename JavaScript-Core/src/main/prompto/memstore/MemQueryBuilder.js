var QueryBuilder = require("../store/Store").QueryBuilder;
var AndPredicate = require("./AndPredicate").AndPredicate;
var OrPredicate = require("./OrPredicate").OrPredicate;
var NotPredicate = require("./NotPredicate").NotPredicate;
var MatchPredicate = require("./MatchPredicate").MatchPredicate;

class MemQueryBuilder extends QueryBuilder {
    constructor() {
        super();
        this.orderBys = null;
        this.predicates = null;
        this.first = null;
        this.last = null;
        return this;
    }

    verify(fieldInfo, matchOp, value) {
        if(this.predicates==null)
            this.predicates = [];
        this.predicates.push(new MatchPredicate(fieldInfo, matchOp, value));
    }

    and() {
        var right = this.predicates.pop();
        var left = this.predicates.pop();
        this.predicates.push(new AndPredicate(left, right));
    }

    or() {
        var right = this.predicates.pop();
        var left = this.predicates.pop();
        this.predicates.push(new OrPredicate(left, right));
    }

    not() {
        var top = this.predicates.pop();
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
            orderBys : this.orderBys
        };
    }

    addOrderByClause(info, descending) {
        if (this.orderBys == null)
            this.orderBys = [];
        this.orderBys.push({info: info, descending: descending});
    }
}

exports.MemQueryBuilder = MemQueryBuilder;