require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseOParserTest").parseString;

exports.testAttribute = function(test) {
	test.throws( function() {
		var context = prompto.runtime.Context.newGlobalContext();
		test.equal(context.getRegisteredDeclaration("id"), null);
		var stmts = parseString("attribute id: Integer;");
		test.ok(stmts);
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("id");
		test.ok(actual);
		test.ok(actual instanceof prompto.declaration.AttributeDeclaration);
		stmts.register(context);
	}, prompto.error.SyntaxError);
	test.done();
};

exports.testCategory = function(test) {
	test.throws( function() {
		var context = prompto.runtime.Context.newGlobalContext();
		test.equal(context.getRegisteredDeclaration("Person"), null);
		var stmts = parseString("category Person(id, name);");
		test.ok(stmts);
		stmts.register(context);
		var actual = context.getRegisteredDeclaration("Person");
		test.ok(actual);
		test.ok(actual instanceof prompto.declaration.CategoryDeclaration);
		stmts.register(context);
	}, prompto.error.SyntaxError);
	test.done();
};

exports.testMethod = function(test) {
	var context = prompto.runtime.Context.newGlobalContext();
	test.equal(context.getRegisteredDeclaration("printName"), null);
	var stmts = parseString("attribute name: Text;"
	+ "method printName( name ) {"
	+ "print (value=name); }");
	test.ok(stmts);
	stmts.register(context);
	var actual = context.getRegisteredDeclaration("printName");
	test.ok(actual);
	test.ok(actual instanceof prompto.runtime.MethodDeclarationMap);
	stmts = parseString("method printName (Person p ) {"
	+ "print (value = \"person\" + p.name ); }");
	test.ok(stmts);
	stmts.register(context);
	test.done();
};


