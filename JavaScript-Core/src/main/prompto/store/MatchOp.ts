export default class MatchOp {

    static EQUALS = new MatchOp("EQUALS");
    static ROUGHLY = new MatchOp("ROUGHLY");
    static CONTAINS = new MatchOp("CONTAINS");
    static HAS = new MatchOp("HAS");
    static IN = new MatchOp("IN");
    static CONTAINED = new MatchOp("CONTAINED");
    static GREATER = new MatchOp("GREATER");
    static LESSER = new MatchOp("LESSER");

    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    toString(): string {
        return this.name;
    }

    toTranspiled(): string {
        return "new MatchOp('" + this.name + "')";
    }
}

