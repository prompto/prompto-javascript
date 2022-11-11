import { ErrorListener } from 'antlr4';
import { Token, TokenStream, Parser } from 'antlr4';
export default class AbstractParser extends Parser {
    path: string;
    constructor(input: TokenStream);
    isText(token: Token, text: string): boolean;
    was(type: number): boolean;
    wasNot(type: number): boolean;
    wasNotWhiteSpace(): boolean;
    willBe(type: number): boolean;
    willBeIn(...args: number[]): boolean;
    willNotBe(type: number): boolean;
    nextHiddenTokenType(): number;
    willBeAOrAn(): boolean;
    willBeText(text: string): boolean;
    lastHiddenTokenType(): number;
    removeErrorListeners(): void;
    addErrorListener(listener: ErrorListener<Token>): void;
    equalToken(): number;
    wsToken(): number;
}
