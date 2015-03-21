require("../../../../exploded");

var presto = require("../../../../main/presto/index");
var Out = require("../../runtime/utils/Out").Out;
var parseString = require("../../parser/BaseOParserTest").parseString;
var SyntaxError = presto.error.SyntaxError;

var context;

exports.setUp = function(done) {
	Out.init();
	context = presto.runtime.Context.newGlobalContext();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};


exports.testNativeAttribute = function(test) {
	var stmts = parseString("attribute id: Integer;");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testUndeclaredCategoryAttribute = function(test) {
	var stmts = parseString("attribute person : Person;");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since Person is not declared !");
	test.done();
};


exports.testMethodAttribute = function(test) {
	var stmts = parseString("attribute name: Text;" +
			"method PrintName(name) { " +
			"print ( value = \"name\" + name ); }" +
			"category Person extends PrintName;");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since printName is not a category !");
	test.done();
};


exports.testCategoryAttribute = function(test) {
	var stmts = parseString("attribute id: Integer;" +
			"category Person(id);" +
			"attribute person: Person;");
	stmts.register(context);
	stmts.check(context);
	test.done();
};



exports.testCategoryWithUndeclaredDerived = function(test) {
	var stmts = parseString("category Employee extends Person;");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since Person not declared !");
	test.done();
};


exports.testCategoryWithUndeclaredAttribute = function(test) {
	var stmts = parseString("category Person(id);");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since id is not declared !");
	test.done();
};


exports.testCategory = function(test) {
	var stmts = parseString("attribute id: Integer;" +
			"category Person(id);" +
			"category Employee extends Person;");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testMethodWithUndeclaredAttribute = function(test) {
	var stmts = parseString("method printName(name) {" +
			"print (value = \"name\" + name ); }");
	test.throws(function() { stmts.register(context); }, SyntaxError,"Should fail since name is not declared !");
	test.done();
};


exports.testMethod = function(test) {
	var stmts = parseString("native method print( Text value) {" +
				"Java: System.out.println(value); }" +
				"attribute name: Text;" +
				"method printName(name ) {" +
				"print( value = \"name\" + name ); }" );
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testList = function(test) {
	var stmts = parseString("method test (Text value) {" +
				"list = [ \"john\" , \"jim\" ];" +
				"elem = list[1]; }");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testDict = function(test) {
	var stmts = parseString("method test (Text value) {" +
				"dict = { \"john\":123, \"jim\":345 };" +
				"elem = dict[\"john\"]; }");
	stmts.register(context);
	stmts.check(context);
	test.done();
};

