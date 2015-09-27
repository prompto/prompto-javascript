require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var parseString = require("../../parser/BaseEParserTest").parseString;

exports.testAttribute = function(test) {
	test.throws( function() {
		var context = prompto.runtime.Context.newGlobalContext();
		test.equal(context.getRegisteredDeclaration("id"), null);
		var stmts = parseString("define id as Integer attribute");
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
		var stmts = parseString("define Person as category with attributes id and name");
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
	var stmts = parseString("define name as Text attribute\r\n" +
			"define printName as method receiving name doing:\r\n" +
			"\tprint with \"name\" + name as value");
	test.ok(stmts);
	stmts.register(context);
	var actual = context.getRegisteredDeclaration("printName");
	test.ok(actual);
	test.ok(actual instanceof prompto.runtime.MethodDeclarationMap);
	stmts = parseString("define printName as method receiving Person p doing:" +
			"\r\n\tprint with \"person\" + p.name as value");
	test.ok(stmts);
	stmts.register(context);
	test.done();
};

