require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var antlr4 = require("antlr4");

function parse_expression(code) {
	var parser = new prompto.parser.OCleverParser(code);
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.expression();
	var builder = new prompto.parser.OPromptoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
}


exports.test3Minuses = function(test) {
	var exp = parse_expression("1-2-3-4");
	var context = prompto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), -8);
	test.done();
};

exports.test2Plus3Minuses = function(test) {
	var exp = parse_expression("1+2-3+4-5-6");
	var context = prompto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), -7);
	test.done();
};

exports.test1Star1Plus = function(test) {
	var exp = parse_expression("1*2+3");
	var context = prompto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), 5);
	test.done();
};


