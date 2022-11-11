import {CharStream, Lexer, Parser} from 'antlr4';

export default interface IParserFactory {
    newLexer(data: string): Lexer;
    newParser(path: string, data: CharStream): Parser;
}
