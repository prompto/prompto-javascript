var antlr4 = require("antlr4");
var ELexer = require("./ELexer").ELexer;
var EIndentingLexer = require("./EIndentingLexer").EIndentingLexer;

exports.parseTokens = function(lexer) {
	var result = [];
	var t = lexer.nextToken();
	while (t.type!==antlr4.Token.EOF) {
		if(t.channel!==antlr4.Lexer.HIDDEN) {
			result.push(t);
		}
		t = lexer.nextToken();
	}
	return result;
};

exports.parseTokenTypes = function(lexer) {
	var tokens = exports.parseTokens(lexer);
	var result = [];
	for(var i = 0; i<tokens.length; i++) {
		result[i] = tokens[i].type;
	}
	return result;
};

exports.parseTokenNames = function(lexer) {
	var tokens = exports.parseTokens(lexer);
	var s = "";
	for(var i=0; i<tokens.length; i++) {
		s += ELexer.prototype.symbolicNames[tokens[i].type] + " ";
	}
	return s.substring(0,s.length-1);
};

exports.newTokenStreamFromString = function(input) {
	var stream = new antlr4.InputStream(input);
	return new EIndentingLexer(stream);
};

exports.newTokenStreamFromResource = function(resourceName) {
	var stream = new antlr4.FileStream(resourceName);
	return new EIndentingLexer(stream);
};

exports.parseTokenNamesFromString = function(input) {
	var lexer = exports.newTokenStreamFromString(input);
	return exports.parseTokenNames(lexer);
};

exports.parseTokenNamesFromResource = function(input) {
	var lexer = exports.newTokenStreamFromResource(input);
	return exports.parseTokenNames(lexer);
};

exports.tokenNamesAsString = function(tokenTypes) {
	var s = "";
	for(var i=0;i<tokenTypes.length;i++) {
		s += ELexer.prototype.symbolicNames[tokenTypes[i]]  + " ";
	}
	return s.substring(0,s.length-1);
};



