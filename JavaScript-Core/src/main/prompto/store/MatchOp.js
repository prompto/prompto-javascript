function MatchOp(name) {
    this.name = name;
    return this;
};

MatchOp.prototype.toString = function() {
    return this.name;
};

MatchOp.EQUALS = new MatchOp("EQUALS");
MatchOp.ROUGHLY = new MatchOp("ROUGHLY");
MatchOp.CONTAINS = new MatchOp("CONTAINS");
MatchOp.CONTAINED = new MatchOp("CONTAINED");
MatchOp.GREATER = new MatchOp("GREATER");
MatchOp.LESSER = new MatchOp("LESSER");

exports.MatchOp = MatchOp;