var prompto = require("../../../../main/prompto/index");
var Out = require("../../runtime/utils/Out").Out;
var parseString = require("../../parser/BaseOParserTest").parseString;
var SyntaxError = prompto.error.SyntaxError;

var context;

beforeEach(() => {
	Out.init();
	context = prompto.runtime.Context.newGlobalContext();
});

afterEach(() => {
	Out.restore();
});


test('NativeAttribute is checked', () => {
	var stmts = parseString("attribute id: Integer;");
	stmts.register(context);
	stmts.check(context);
});


test('Undeclared CategoryAttribute throws', () => {
	var stmts = parseString("attribute person : Person;");
	stmts.register(context);
	expect(() => {
		stmts.check(context);
	}).toThrow(new SyntaxError("Unknown category: Person"));
});


test('Method parent Category throws', () => {
	var stmts = parseString("attribute name: Text;" +
			"method PrintName(name) {}" +
			"category Person extends PrintName;");
	stmts.register(context);
	expect(() => {
		stmts.check(context);
	}).toThrow(new SyntaxError("Invalid category: PrintName"));
});


test('Category Attribute is checked', () => {
	var stmts = parseString("attribute id: Integer;" +
			"category Person(id);" +
			"attribute person: Person;");
	stmts.register(context);
	stmts.check(context);
});



test('Category With Undeclared Derived throws', () => {
	var stmts = parseString("category Employee extends Person;");
	stmts.register(context);
	expect(() => {
		stmts.check(context);
	}).toThrow(new SyntaxError("Unknown category: Person"));
});


test('Category With Undeclared Attribute throws', () => {
	var stmts = parseString("category Person(id);");
	stmts.register(context);
	expect(() => {
		stmts.check(context);
	}).toThrow(new SyntaxError("Unknown attribute: id"));
});


test('Category is checked', () => {
	var stmts = parseString("attribute id: Integer;" +
			"category Person(id);" +
			"category Employee extends Person;");
	stmts.register(context);
	stmts.check(context);
});


test('Duplicate Method throws', () => {
	var stmts = parseString("method printName(name) {" +
			"print (value = \"name\" + name ); }");
    stmts.register(context);
    expect(() => {
    	stmts.register(context);
	}).toThrow(new SyntaxError("Duplicate name: printName"));
});


test('Method is checked', () => {
	var stmts = parseString("native method print( Text value) {" +
				"Java: System.out.println(value); }" +
				"attribute name: Text;" +
				"method printName(name ) {" +
				"print( value = \"name\" + name ); }" );
	stmts.register(context);
	stmts.check(context);
});


test('List is checked', () => {
	var stmts = parseString("method testMethod (Text value) {" +
				"list = [ \"john\" , \"jim\" ];" +
				"elem = list[1]; }");
	stmts.register(context);
	stmts.check(context);
});


test('Dict is checked', () => {
	var stmts = parseString("method testMethod (Text value) {" +
				"dict = { \"john\":123, \"jim\":345 };" +
				"elem = dict[\"john\"]; }");
	stmts.register(context);
	stmts.check(context);
});

