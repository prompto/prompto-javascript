import { Token } from 'antlr4';
export default class Location {
    static min(l1: Location, l2: Location): Location;
    static max(l1: Location, l2: Location): Location;
    tokenIndex: number;
    line: number;
    column: number;
    constructor(token: Token, isEnd?: boolean);
    serialize(): {
        type: string;
        value: {
            tokenIndex: number;
            line: number;
            column: number;
        };
    };
}
