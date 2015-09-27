require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;

var os = require("os");
var antlr4 = require("antlr4");
var prompto = require("../../../../main/prompto/index");
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
	var parser = new prompto.parser.OCleverParser("process.stdout.write(value);");
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.javascript_statement();
	var builder = new prompto.parser.OPromptoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	var statement = builder.getNodeValue(tree);
	var context = prompto.runtime.Context.newGlobalContext();
    var id = new prompto.grammar.Identifier("value")
	var arg = new prompto.grammar.CategoryArgument(
        prompto.type.TextType.instance, id);
	arg.register(context);
	context.setValue(id, new prompto.literal.TextLiteral("\"test\"")); // StringLiteral trims enclosing quotes
	var result = statement.interpret(context);
	test.ok(result===null);
	test.equal("test", Out.read());
	test.done();
};

exports.testReturn = function(test) {
	runResource("native/return.poc");
	test.equal(Out.read(), os.type());
	test.done();
};

exports.testDateTimeTZName = function(test) {
    runResource("builtins/dateTimeTZName.poc");
    var tzName = "UTC"; // TimeZone.getTimeZone("UTC").getDisplayName(Locale.ENGLISH);
    // test.equal(Out.read(), "tzName=" + tzName);
    test.done();
};

