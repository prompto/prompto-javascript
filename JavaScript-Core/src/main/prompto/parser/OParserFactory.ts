import {CharStream, Lexer, Parser} from 'antlr4';
import {ONamingLexer, OCleverParser, IParserFactory} from '../parser'

export default class MParserFactory implements IParserFactory {

	newLexer(data: string): Lexer {
		return new ONamingLexer(new CharStream(data));
	}

	newParser(path: string, data: CharStream): Parser {
		return new OCleverParser(path, data);
	}

}
