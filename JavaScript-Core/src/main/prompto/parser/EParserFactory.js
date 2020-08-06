var antlr4 = require("antlr4/index");
var EIndentingLexer = require("./EIndentingLexer").EIndentingLexer;
var ECleverParser = require("./ECleverParser").ECleverParser;

exports.EParserFactory = function() {
	
	this.newLexer = data => new EIndentingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new ECleverParser(path, data);

};
