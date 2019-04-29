var antlr4 = require("antlr4");
var prompto = require("../../../../main/prompto/index");
var ECleverParser = prompto.parser.ECleverParser;
var EPromptoBuilder = prompto.parser.EPromptoBuilder;

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

test('Return', () => {
	var statement = "return value;";
	var stmt = parse_java_statement(statement);
	expect(stmt).toBeTruthy();
	expect(statement).toEqual(stmt.toString());
});


test('Expression', () => {
	var statement = "System.out;";
	var stmt = parse_java_statement(statement);
	expect(stmt).toBeTruthy();
	expect(statement).toEqual(stmt.toString());
});


test('Array', () => {
	var statement = "value[15];";
	var stmt = parse_java_statement(statement);
	expect(stmt).toBeTruthy();
	expect(statement).toEqual(stmt.toString());
});


test('Function', () => {
	var statement = "System.out.print(value);";
	var stmt = parse_java_statement(statement);
	expect(stmt).toBeTruthy();
	expect(statement).toEqual(stmt.toString());
});


