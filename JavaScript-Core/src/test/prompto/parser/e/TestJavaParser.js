require("../../../../exploded");

var antlr4 = require("antlr4");
var ECleverParser = require("../../../../main/prompto/parser/ECleverParser").ECleverParser;
var EPromptoBuilder = require("../../../../main/prompto/parser/EPromptoBuilder").EPromptoBuilder;

function parse_java_statement(code) {
	var parser = new ECleverParser(code);
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.java_statement();
	var builder = new EPromptoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
}

exports.testReturn = function(test) {
	var statement = "return value;";
	var stmt = parse_java_statement(statement);
	test.ok(stmt);
	test.equal(statement,stmt.toString());
	test.done();
};


exports.testExpression = function(test) {
	var statement = "System.out;";
	var stmt = parse_java_statement(statement);
	test.ok(stmt);
	test.equal(statement,stmt.toString());
	test.done();
};


exports.testArray = function(test) {
	var statement = "value[15];";
	var stmt = parse_java_statement(statement);
	test.ok(stmt);
	test.equal(statement,stmt.toString());
	test.done();
};


exports.testFunction = function(test) {
	var statement = "System.out.print(value);";
	var stmt = parse_java_statement(statement);
	test.ok(stmt);
	test.equal(statement,stmt.toString());
	test.done();
};


