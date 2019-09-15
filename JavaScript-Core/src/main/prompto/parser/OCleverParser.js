var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var fs = isNodeJs ? require("fs") : {}; // nodejs only
var antlr4 = require("antlr4/index");
var ONamingLexer = require("./ONamingLexer").ONamingLexer;
var OParser = require("../../../generated/prompto/parser/OParser").OParser;
var OPromptoBuilder = require("./OPromptoBuilder").OPromptoBuilder;

function createInput(input) {
	if(typeof(input)==='string' || input instanceof String) {
		if(isNodeJs && fs.existsSync(input)) {
			input = new antlr4.FileStream(input);
		} else {
			input = new antlr4.InputStream(input);
		}
	}
	if(input instanceof antlr4.InputStream) {
		input = new ONamingLexer(input);
	}
	if(input instanceof antlr4.Lexer) {
		input = new antlr4.CommonTokenStream(input);
	}
	return input;
}

function OCleverParser(input) {
	OParser.call(this,createInput(input));
	this.path = "";
	return this;
}

OCleverParser.prototype = Object.create(OParser.prototype);
OCleverParser.prototype.constructor = OCleverParser;

OCleverParser.prototype.parse = function() {
	return this.parse_declaration_list();
};

OCleverParser.prototype.parse_declaration_list = function() {
	return this.doParse(this.declaration_list);
};

OCleverParser.prototype.parse_repl_input = function() {
	return this.doParse(this.repl, true);
};

OCleverParser.prototype.parse_document_literal = function() {
	return this.doParse(this.document_literal);
};

OCleverParser.prototype.equalToken = function() {
	return OParser.EQUAL;
};

OCleverParser.prototype.doParse = function(rule) {
    var tree = rule.bind(this)();
    var builder = new OPromptoBuilder(this);
    var walker = new antlr4.tree.ParseTreeWalker();
    walker.walk(builder, tree);
    return builder.getNodeValue(tree);
};


exports.OCleverParser = OCleverParser;