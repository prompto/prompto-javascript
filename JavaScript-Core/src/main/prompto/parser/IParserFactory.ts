import antlr4 from 'antlr4';

export default interface IParserFactory {
    newLexer(data: string): antlr4.Lexer;
    newParser(path: string, data: antlr4.CharStream): antlr4.Parser;
}
