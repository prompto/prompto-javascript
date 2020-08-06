const antlr4 = require("antlr4/index");
const ONamingLexer = require("./ONamingLexer").ONamingLexer;
const OCleverParser = require("./OCleverParser").OCleverParser;

exports.OopsParserFactory =  function() {
	
	this.newLexer = data => new ONamingLexer(new antlr4.InputStream(data));

	this.newParser = (path, data) => new OCleverParser(path, data);

};