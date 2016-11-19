var antlr4 = require("antlr4/index");
var SIndentingLexer = require("./MIndentingLexer").MIndentingLexer;
var SCleverParser = require("./MCleverParser").MCleverParser;

antlr4.MParserFactory = function() {
	
	this.newLexer = function(data) {
		return new SIndentingLexer(new antlr4.InputStream(data));
	};

	this.newParser = function(path, data) {
		return new SCleverParser(path, data);
	};

};
