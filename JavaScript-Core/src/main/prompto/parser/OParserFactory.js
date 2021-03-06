import antlr4 from 'antlr4';
import { ONamingLexer, OCleverParser } from './index.js'

export default function OParserFactory() {
	
	this.newLexer = data => new ONamingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new OCleverParser(path, data);

}