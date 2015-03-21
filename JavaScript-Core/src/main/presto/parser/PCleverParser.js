var fs = require("fs");
var antlr4 = require("antlr4");
var PIndentingLexer = require("./PIndentingLexer").PIndentingLexer;
var PParser = require("./PParser").PParser;
var PPrestoBuilder = require("./PPrestoBuilder").PPrestoBuilder;

function createInput(input) {
	if(typeof(input)==='string' || input instanceof String) {
		if(fs.existsSync(input)) {
			input = new antlr4.FileStream(input);
		} else {
			input = new antlr4.InputStream(input);
		}
	}
	if(input instanceof antlr4.InputStream) {
		input = new PIndentingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

function PCleverParser(input) {
	PParser.call(this,createInput(input));
	this.path = "";
	return this;
}

PCleverParser.prototype = Object.create(PParser.prototype);
PCleverParser.prototype.constructor = PCleverParser;

PCleverParser.prototype.parse = function() {
	return this.parse_declaration_list();
};
	
PCleverParser.prototype.parse_declaration_list = function() {
	var tree = this.declaration_list();
	var builder = new PPrestoBuilder(this);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
};

PCleverParser.prototype.equalToken = function() {
    return PParser.EQUAL;
};

exports.PCleverParser = PCleverParser;