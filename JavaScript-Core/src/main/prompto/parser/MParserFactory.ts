import antlr4 from 'antlr4';
import {MIndentingLexer, MCleverParser, IParserFactory} from '../parser'

export default class MParserFactory implements IParserFactory {

	newLexer(data: string): antlr4.Lexer {
		return new MIndentingLexer(new antlr4.CharStream(data));
	}

	newParser(path: string, data: antlr4.CharStream): antlr4.Parser {
		return new MCleverParser(path, data);
	}

}
