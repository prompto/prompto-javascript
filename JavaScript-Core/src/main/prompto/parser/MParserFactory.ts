import {CharStream, Lexer, Parser} from 'antlr4';
import {MIndentingLexer, MCleverParser, IParserFactory} from '../parser'

export default class MParserFactory implements IParserFactory {

	newLexer(data: string): Lexer {
		return new MIndentingLexer(new CharStream(data));
	}

	newParser(path: string, data: CharStream): Parser {
		return new MCleverParser(path, data);
	}

}
