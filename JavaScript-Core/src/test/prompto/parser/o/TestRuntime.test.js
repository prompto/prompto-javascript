import antlr4 from "antlr4";
var prompto = require("../../../../main/prompto/index");
var Out = require("../../runtime/utils/Out").Out;

var os = require("os");
var interpretResource = require("../../parser/BaseOParserTest").interpretResource;

beforeEach(() => {
	Out.init();
});

afterEach(() => {
	Out.restore();
});


test('SystemOutPrint', () => {
	var parser = new prompto.parser.OCleverParser("process.stdout.write(value);");
	var lexer = parser.getTokenStream().tokenSource;
	lexer.addLF = false;
	var tree = parser.javascript_statement();
	var builder = new prompto.parser.OPromptoBuilder(parser);
	var walker = new antlr4.tree.ParseTreeWalker();
	walker.walk(builder, tree);
	var statement = builder.getNodeValue(tree);
	var context = prompto.runtime.Context.newGlobalsContext();
    var id = new prompto.grammar.Identifier("value")
	var arg = new prompto.param.CategoryParameter(
        prompto.type.TextType.instance, id);
	arg.register(context);
	context.setValue(id, new prompto.literal.TextLiteral("\"test\"")); // StringLiteral trims enclosing quotes
	var result = statement.interpret(context);
	expect(result).toBeNull();
	expect(Out.read()).toEqual("test");
});

test('Return', () => {
	interpretResource("native/return.poc");
	expect(Out.read()).toEqual(os.type());
});

test('DateTimeTZName', () => {
	interpretResource("builtins/dateTimeTZName.poc");
	// var tzName = "UTC"; // TimeZone.getTimeZone("UTC").getDisplayName(Locale.ENGLISH);
	// test.equal(Out.read(), "tzName=" + tzName);
});


