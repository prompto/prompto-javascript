var antlr4 = require("antlr4");
var PIndentingLexer = require("./PIndentingLexer").PIndentingLexer;
var PCleverParser = require("./PCleverParser").PCleverParser;

exports.PParserFactory = function() {
	
	this.newLexer = function(data) {
		return new PIndentingLexer(new antlr4.InputStream(data));
	};

	this.newParser = function(path, data) {
		return new PCleverParser(path, data);
	};

};
