import antlr4 from "antlr4";
var prompto = require("../../../../main/prompto/index");

function parse_expression(code) {
	var parser = new prompto.parser.ECleverParser(code);
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.expression();
	var builder = new prompto.parser.EPromptoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
}


test('3Minuses', () => {
	var exp = parse_expression("1-2-3-4");
	var context = prompto.runtime.Context.newGlobalsContext();
	var value = exp.interpret(context);
	expect(value.IntegerValue()).toEqual( -8);
});

test('2Plus3Minuses', () => {
	var exp = parse_expression("1+2-3+4-5-6");
	var context = prompto.runtime.Context.newGlobalsContext();
	var value = exp.interpret(context);
	expect(value.IntegerValue()).toEqual( -7);
});

test('1Star1Plus', () => {
	var exp = parse_expression("1*2+3");
	var context = prompto.runtime.Context.newGlobalsContext();
	var value = exp.interpret(context);
	expect(value.IntegerValue()).toEqual( 5);
});


