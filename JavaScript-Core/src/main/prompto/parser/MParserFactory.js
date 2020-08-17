import antlr4 from "antlr4/index";

export function MParserFactory() {
	
	this.newLexer = data => new SIndentingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new SCleverParser(path, data);

};
