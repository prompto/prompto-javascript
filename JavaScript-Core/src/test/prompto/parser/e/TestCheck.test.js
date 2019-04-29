var prompto = require("../../../../main/prompto/index");
var Out = require("../../runtime/utils/Out").Out;
var parseString = require("../../parser/BaseEParserTest").parseString;
var SyntaxError = prompto.error.SyntaxError;

var context;

beforeEach(()=> {
	Out.init();
	context = prompto.runtime.Context.newGlobalContext();
});

afterEach(()=> {
	Out.restore();
});
	

test('NativeAttribute is checked', () => {
	var decls = parseString("define id as Integer attribute");
	decls.register(context);
	decls.check(context);
});


test('UndeclaredCategoryAttribute throws', () => {
	var decls = parseString("define person as Person attribute");
	decls.register(context);
	expect(() => {
		decls.check(context);
	}).toThrowError(new SyntaxError("Unknown category: Person"));
});


test('Method used as attribute throws', () => {
	var decls = parseString("define name as Text attribute\r\n" +
			"define printName as method receiving name doing:\r\n" +
			"\tpass\r\n" +
			"define Person as category with attribute printName");
	decls.register(context);
	expect(() => {
		decls.check(context);
	}).toThrowError(new SyntaxError("Invalid attribute: printName"));
});


test('CategoryAttribute is checked', () => {
	var decls = parseString("define id as Integer attribute\r\n" +
			"define Person as category with attribute id\r\n" +
			"define person as Person attribute");
	decls.register(context);
	decls.check(context);
});



test('Category derived from undeclared throws', () => {
	var decls = parseString("define Employee as Person");
	decls.register(context);
	expect(() => {
		decls.check(context);
	}).toThrowError(new SyntaxError("Unknown category: Person"));
});


test('category with undeclared attribute throws', () => {
	var decls = parseString("define Person as category with attribute id");
	decls.register(context);
	expect(() => {
		decls.check(context);
	}).toThrowError(new SyntaxError("Unknown attribute: id"));
});


test('valid Category is checked', () => {
	var decls = parseString("define id as Integer attribute\r\n" +
			"define Person as category with attribute id\r\n" +
			"define Employee as Person");
	decls.register(context);
	decls.check(context);
});


test('Method with undeclared attribute parameter throws', () => {
	var decls = parseString("define printName as method receiving name doing:\r\n" +
			"\tprint with \"name\" + name as value");
    decls.register(context);
	expect(() => {
		decls.check(context);
	}).toThrowError(new SyntaxError("Unknown variable: name"));
});


test('valid Method is checked', () => {
	var decls = parseString("define print as native method receiving Text value doing:\r\n" +
				"\tJava: System.out.println(value);\r\n" +
				"define name as Text attribute\r\n" +
				"define printName as method receiving name doing:\r\n" +
				"\tprint with \"name\" + name as value" );
	decls.register(context);
	decls.check(context);
});



test('valis List is checked', () => {
	var decls = parseString("define testMethod as method receiving Text value doing:\r\n" +
				"\tlist = [ \"john\" , \"jim\" ]\r\n" +
				"\telem = list[1]\r\n");
	decls.register(context);
	decls.check(context);
});


test('valid Dict is checked', () => {
	var decls = parseString("define testMethod as method receiving Text value doing:\r\n" +
				"\tdict = { \"john\":123, \"jim\":345 }\r\n" +
				"\telem = dict[\"john\"]\r\n");
	decls.register(context);
	decls.check(context);
});

