import MLexer from './MLexer';
import { CharStream, Token } from 'antlr4';
export default class MIndentingLexer extends MLexer {
    dialect: {
        name: string;
        parserFactory: () => import("./IParserFactory").default;
        toDialect: (writer: import("..").CodeWriter, writable: import("..").IWritable) => void;
    };
    tokens: Token[];
    indents: number[];
    wasLF: boolean;
    addLF: boolean;
    constructor(input: CharStream);
    nextToken(): Token;
    nextLexerToken(): Token;
    indentedNextToken(): Token;
    getNextToken(): Token;
    interpret(token: Token): void;
    interpretEOF(eof: Token): void;
    interpretLFTAB(lftab: Token): void;
    deriveToken(token: Token, type: number): Token;
    countIndents(text: string): number;
    interpretAnyToken(token: Token): void;
}
