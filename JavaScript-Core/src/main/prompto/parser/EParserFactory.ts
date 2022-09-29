import antlr4 from 'antlr4';
import {EIndentingLexer, ECleverParser, IParserFactory} from '../parser'

export default class EParserFactory implements IParserFactory {
	
	newLexer(data: string): antlr4.Lexer {
		return new EIndentingLexer(new antlr4.CharStream(data));
	}

	newParser(path: string, data: antlr4.CharStream): antlr4.Parser {
		return new ECleverParser(path, data);
	}

}
