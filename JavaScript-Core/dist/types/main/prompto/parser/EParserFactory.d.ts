import { CharStream, Lexer, Parser } from 'antlr4';
import { IParserFactory } from '../parser';
export default class EParserFactory implements IParserFactory {
    newLexer(data: string): Lexer;
    newParser(path: string, data: CharStream): Parser;
}
