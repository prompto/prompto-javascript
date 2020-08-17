import antlr4 from "antlr4/index";

export function EParserFactory() {
	
	this.newLexer = data => new EIndentingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new ECleverParser(path, data);

}
