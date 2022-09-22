import antlr4 from "antlr4";
var prompto = require("../../../main/prompto");

var ELexer = prompto.parser.ELexer;
var EIndentingLexer = prompto.parser.EIndentingLexer;

function parseTokens(lexer) {
	var result = [];
	var t = lexer.nextToken();
	while (t.type!==antlr4.Token.EOF) {
		if(t.channel!==antlr4.Lexer.HIDDEN) {
			result.push(t);
		}
		t = lexer.nextToken();
	}
	return result;
}

function parseTokenNames(lexer) {
	var tokens = parseTokens(lexer);
	var s = "";
	for(var i=0; i<tokens.length; i++) {
		s += ELexer.symbolicNames[tokens[i].type] + " ";
	}
	return s.substring(0,s.length-1);
}

function newTokenStreamFromString(input) {
	var stream = new antlr4.InputStream(input);
	return new EIndentingLexer(stream);
}

function parseTokenNamesFromString(input) {
	var lexer = newTokenStreamFromString(input);
	return parseTokenNames(lexer);
}

function tokenNamesAsString(tokenTypes) {
	var s = "";
	for(var i=0;i<tokenTypes.length;i++) {
		s += ELexer.symbolicNames[tokenTypes[i]]  + " ";
	}
	return s.substring(0,s.length-1);
}

exports.parseTokenNamesFromString = parseTokenNamesFromString;
exports.tokenNamesAsString = tokenNamesAsString;
