import antlr4 from 'antlr4';
import {ONamingLexer, OCleverParser, IParserFactory} from '../parser'

export default class MParserFactory implements IParserFactory {

	newLexer(data: string): antlr4.Lexer {
		return new ONamingLexer(new antlr4.CharStream(data));
	}

	newParser(path: string, data: antlr4.CharStream): antlr4.Parser {
		return new OCleverParser(path, data);
	}

}
