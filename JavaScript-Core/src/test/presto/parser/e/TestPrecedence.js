require("../../../../exploded");

var presto = require("../../../../main/presto/index");
var antlr4 = require("antlr4");

function parse_expression(code) {
	var parser = new presto.parser.ECleverParser(code);
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.expression();
	var builder = new presto.parser.EPrestoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	return builder.getNodeValue(tree);
}


exports.test3Minuses = function(test) {
	var exp = parse_expression("1-2-3-4");
	var context = presto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), -8);
	test.done();
};

exports.test2Plus3Minuses = function(test) {
	var exp = parse_expression("1+2-3+4-5-6");
	var context = presto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), -7);
	test.done();
};

exports.test1Star1Plus = function(test) {
	var exp = parse_expression("1*2+3");
	var context = presto.runtime.Context.newGlobalContext();
	var value = exp.interpret(context);
	test.equal(value.IntegerValue(), 5);
	test.done();
};


