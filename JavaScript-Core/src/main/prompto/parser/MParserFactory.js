import antlr4 from 'antlr4';
import { MIndentingLexer, MCleverParser } from './index.js'

export default function MParserFactory() {
	
	this.newLexer = data => new MIndentingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new MCleverParser(path, data);

}
