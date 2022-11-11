export default class MatchOp {
    static EQUALS: MatchOp;
    static ROUGHLY: MatchOp;
    static CONTAINS: MatchOp;
    static HAS: MatchOp;
    static IN: MatchOp;
    static GREATER: MatchOp;
    static LESSER: MatchOp;
    name: string;
    constructor(name: string);
    toString(): string;
    toTranspiled(): string;
}
