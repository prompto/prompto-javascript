import { CharStream, CommonTokenStream, Lexer, ParserRuleContext } from 'antlr4';
export declare function getFullText(ctx: ParserRuleContext): string;
export declare function createParserInput(data?: string, stream?: CharStream, lexer?: Lexer, newLexer?: (stream: CharStream) => Lexer): CommonTokenStream;
