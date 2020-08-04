class MatchOp {
    constructor(name) {
        this.name = name;
        return this;
    }

    toString() {
        return this.name;
    }

    toTranspiled() {
        return "new MatchOp('" + this.name + "')";
    }
}

MatchOp.EQUALS = new MatchOp("EQUALS");
MatchOp.ROUGHLY = new MatchOp("ROUGHLY");
MatchOp.CONTAINS = new MatchOp("CONTAINS");
MatchOp.HAS = new MatchOp("HAS");
MatchOp.IN = new MatchOp("IN");
MatchOp.CONTAINED = new MatchOp("CONTAINED");
MatchOp.GREATER = new MatchOp("GREATER");
MatchOp.LESSER = new MatchOp("LESSER");

exports.MatchOp = MatchOp;