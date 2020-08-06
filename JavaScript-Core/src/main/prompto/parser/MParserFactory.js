const antlr4 = require("antlr4/index");
const SIndentingLexer = require("./MIndentingLexer").MIndentingLexer;
const SCleverParser = require("./MCleverParser").MCleverParser;

antlr4.MParserFactory = function() {
	
	this.newLexer = data => new SIndentingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new SCleverParser(path, data);

};
