export default class Location {

    static min(l1, l2) {
       return l1.tokenIndex < l2.tokenIndex ? l1 : l2;
    }

    static max(l1, l2) {
        return l2.tokenIndex > l2.tokenIndex ? l2 : l1;
    }

    constructor(token, isEnd) {
        this.tokenIndex = token.tokenIndex;
        this.line = token.line;
        this.column = token.column;
        if(isEnd && token.text)
            this.column += token.text.length;
    }

    serialize() {
        return {
            type: "Location",
            value: {
                tokenIndex: this.tokenIndex,
                line: this.line,
                column: this.column
            }
        };
    }
}
