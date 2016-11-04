var QueryBuilder = require("../store/Store").QueryBuilder;
var AndPredicate = require("./AndPredicate").AndPredicate;
var OrPredicate = require("./OrPredicate").OrPredicate;
var NotPredicate = require("./NotPredicate").NotPredicate;
var MatchPredicate = require("./MatchPredicate").MatchPredicate;

function MemQueryBuilder() {
    QueryBuilder.call(this);
    this.orderBys = null;
    this.predicates = null;
    this.first = null;
    this.last = null;
    return this;
}

MemQueryBuilder.prototype = Object.create(QueryBuilder.prototype);
MemQueryBuilder.prototype.constructor = MemQueryBuilder;

MemQueryBuilder.prototype.verify = function(fieldName, matchOp, value) {
    if(this.predicates==null)
        this.predicates = [];
    this.predicates.push(new MatchPredicate(fieldName, matchOp, value));
};

MemQueryBuilder.prototype.and = function() {
    var right = this.predicates.pop();
    var left = this.predicates.pop();
    this.predicates.push(new AndPredicate(left, right));
};

MemQueryBuilder.prototype.or = function() {
    var right = this.predicates.pop();
    var left = this.predicates.pop();
    this.predicates.push(new OrPredicate(left, right));
};

MemQueryBuilder.prototype.not = function() {
    var top = this.predicates.pop();
    this.predicates.push(new NotPredicate(top));
};


MemQueryBuilder.prototype.setFirst = function(value) {
    this.first = value;
};

MemQueryBuilder.prototype.setLast = function(value) {
    this.last = value;
};


MemQueryBuilder.prototype.build = function() {
    return {
        predicate: this.predicates==null ? null : this.predicates.pop(),
        first: this.first,
        last: this.last,
        orderBys : this.orderBys
    };
};

MemQueryBuilder.prototype.addOrderByClause = function(info, descending) {
    if (this.orderBys == null)
        this.orderBys = [];
    this.orderBys.push({info: info, descending: descending});
};

exports.MemQueryBuilder = MemQueryBuilder;