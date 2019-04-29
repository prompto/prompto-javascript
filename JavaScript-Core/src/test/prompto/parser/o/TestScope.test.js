var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseOParserTest").parseString;

test('Attribute', () => {
	expect(() => {
		var context = prompto.runtime.Context.newGlobalContext();
		expect(context.getRegisteredDeclaration("id")).toBeNull();
		var stmts = parseString("attribute id: Integer;");
		expect(stmts).toBeTruthy();
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("id");
		expect(actual).toBeTruthy();
		expect(actual instanceof prompto.declaration.AttributeDeclaration).toBeTruthy();
        stmts = parseString("attribute id: Integer;");
		stmts.register(context);
	}).toThrow(new prompto.error.SyntaxError("Duplicate name: id"));
});

test('Category', () => {
	expect(() => {
		var context = prompto.runtime.Context.newGlobalContext();
		expect(context.getRegisteredDeclaration("Person")).toBeNull();
		var stmts = parseString("category Person(id, name);");
		expect(stmts).toBeTruthy();
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("Person");
		expect(actual).toBeTruthy();
		expect(actual instanceof prompto.declaration.CategoryDeclaration).toBeTruthy();
        stmts = parseString("category Person(id, name);");
		stmts.register(context);
	}).toThrow(new prompto.error.SyntaxError("Duplicate name: Person"));
});

test('Method', () => {
	var context = prompto.runtime.Context.newGlobalContext();
	expect(context.getRegisteredDeclaration("printName")).toBeNull();
	var stmts = parseString("attribute name: Text;"
	+ "method printName( name ) {"
	+ "print (value=name); }");
	expect(stmts).toBeTruthy();
	stmts.register(context);
	var actual = context.getRegisteredDeclaration("printName");
	expect(actual).toBeTruthy();
	expect(actual instanceof prompto.runtime.MethodDeclarationMap).toBeTruthy();
	stmts = parseString("method printName (Person p ) {"
	+ "print (value = \"person\" + p.name ); }");
	expect(stmts).toBeTruthy();
	stmts.register(context);
});


