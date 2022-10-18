import {CharStream, Lexer, Parser} from 'antlr4';
import {EIndentingLexer, ECleverParser, IParserFactory} from '../parser'

export default class EParserFactory implements IParserFactory {
	
	newLexer(data: string): Lexer {
		return new EIndentingLexer(new CharStream(data));
	}

	newParser(path: string, data: CharStream): Parser {
		return new ECleverParser(path, data);
	}

}
