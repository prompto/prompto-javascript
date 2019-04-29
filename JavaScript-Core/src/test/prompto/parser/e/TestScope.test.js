var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

test('Attribute', () => {
	expect(() => {
		var context = prompto.runtime.Context.newGlobalContext();
		expect(context.getRegisteredDeclaration("id")).toBeNull();
		var stmts = parseString("define id as Integer attribute");
		expect(stmts).toBeTruthy();
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("id");
		expect(actual).toBeTruthy();
		expect(actual instanceof prompto.declaration.AttributeDeclaration).toBeTruthy();
        stmts = parseString("define id as Integer attribute");
		stmts.register(context);
	}).toThrow(new prompto.error.SyntaxError("Duplicate name: id"));
});

test('Category', () => {
	expect(() => {
		var context = prompto.runtime.Context.newGlobalContext();
		expect(context.getRegisteredDeclaration("Person")).toBeNull();
		var stmts = parseString("define Person as category with attributes id and name");
		expect(stmts).toBeTruthy();
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("Person");
		expect(actual).toBeTruthy();
		expect(actual instanceof prompto.declaration.CategoryDeclaration).toBeTruthy();
        stmts = parseString("define Person as category with attributes id and name");
		stmts.register(context);
	}).toThrow(new prompto.error.SyntaxError("Duplicate name: Person"));
});

test('Method', () => {
	var context = prompto.runtime.Context.newGlobalContext();
	expect(context.getRegisteredDeclaration("printName")).toBeNull();
	var stmts = parseString("define name as Text attribute\r\n" +
			"define printName as method receiving name doing:\r\n" +
			"\tprint with \"name\" + name as value");
	expect(stmts).toBeTruthy();
	stmts.register(context);
	var actual = context.getRegisteredDeclaration("printName");
	expect(actual).toBeTruthy();
	expect(actual instanceof prompto.runtime.MethodDeclarationMap).toBeTruthy();
	stmts = parseString("define printName as method receiving Person p doing:" +
			"\r\n\tprint with \"person\" + p.name as value");
	expect(stmts).toBeTruthy();
	stmts.register(context);
});

