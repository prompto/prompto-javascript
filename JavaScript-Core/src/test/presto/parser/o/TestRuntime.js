require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;

var os = require("os");
var antlr4 = require("antlr4");
var presto = require("../../../../main/presto/index");
var parseString = require("../../parser/BaseOParserTest").parseString;
var parseResource = require("../../parser/BaseOParserTest").parseResource;
var runResource = require("../../parser/BaseOParserTest").runResource;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};


exports.testSystemOutPrint = function(test) {
	var parser = new presto.parser.OCleverParser("process.stdout.write(value);");
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.javascript_statement();
	var builder = new presto.parser.OPrestoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	var statement = builder.getNodeValue(tree);
	var context = presto.runtime.Context.newGlobalContext();
	var arg = new presto.grammar.CategoryArgument(presto.type.TextType.instance,"value");
	arg.register(context);
	context.setValue("value", new presto.literal.TextLiteral("\"test\"")); // StringLiteral trims enclosing quotes
	var result = statement.interpret(context);
	test.ok(result===null);
	test.equal("test", Out.read());
	test.done();
};

exports.testReturn = function(test) {
	runResource("native/return.o");
	test.equal(Out.read(), os.type());
	test.done();
};

exports.testDateTimeTZName = function(test) {
    runResource("builtins/dateTimeTZName.o");
    var tzName = "UTC"; // TimeZone.getTimeZone("UTC").getDisplayName(Locale.ENGLISH);
    // test.equal(Out.read(), "tzName=" + tzName);
    test.done();
};

