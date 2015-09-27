require("../../../../exploded");

var prompto = require("../../../../main/prompto/index");
var Out = require("../../runtime/utils/Out").Out;
var parseString = require("../../parser/BaseEParserTest").parseString;
var SyntaxError = prompto.error.SyntaxError;

var context;

exports.setUp = function(done) {
	Out.init();
	context = prompto.runtime.Context.newGlobalContext();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};
	

exports.testNativeAttribute = function(test) {
	var stmts = parseString("define id as Integer attribute");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testUndeclaredCategoryAttribute = function(test) {
	var stmts = parseString("define person as Person attribute");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since Person is not declared !");
	test.done();
};


exports.testMethodAttribute = function(test) {
	var stmts = parseString("define name as Text attribute\r\n" +
			"define printName as method receiving name doing:\r\n" +
			"\tprint with \"name\" + name as value\r\n" +
			"define Person as category with attribute printName");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since printName is not a category !");
	test.done();
};


exports.testCategoryAttribute = function(test) {
	var stmts = parseString("define id as Integer attribute\r\n" +
			"define Person as category with attribute id\r\n" +
			"define person as Person attribute");
	stmts.register(context);
	stmts.check(context);
	test.done();
};



exports.testCategoryWithUndeclaredDerived = function(test) {
	var stmts = parseString("define Employee as Person");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since Person not declared !");
	test.done();
};


exports.testCategoryWithUndeclaredAttribute = function(test) {
	var stmts = parseString("define Person as category with attribute id");
	stmts.register(context);
	test.throws(function() { stmts.check(context); }, SyntaxError, "Should fail since id not declared !");
	test.done();
};


exports.testCategory = function(test) {
	var stmts = parseString("define id as Integer attribute\r\n" +
			"define Person as category with attribute id\r\n" +
			"define Employee as Person");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testMethodWithUndeclaredAttribute = function(test) {
	var stmts = parseString("define printName as method receiving name doing:\r\n" +
			"\tprint with \"name\" + name as value");
	test.throws(function() { stmts.register(context); }, SyntaxError, "Should fail since name not declared !");
	test.done();
};


exports.testMethod = function(test) {
	var stmts = parseString("define print as native method receiving Text value doing:\r\n" +
				"\tJava: System.out.println(value);\r\n" +
				"define name as Text attribute\r\n" +
				"define printName as method receiving name doing:\r\n" +
				"\tprint with \"name\" + name as value" );
	stmts.register(context);
	stmts.check(context);
	test.done();
};



exports.testList = function(test) {
	var stmts = parseString("define testMethod as method receiving Text value doing:\r\n" +
				"\tlist = [ \"john\" , \"jim\" ]\r\n" +
				"\telem = list[1]\r\n");
	stmts.register(context);
	stmts.check(context);
	test.done();
};


exports.testDict = function(test) {
	var stmts = parseString("define testMethod as method receiving Text value doing:\r\n" +
				"\tdict = { \"john\":123, \"jim\":345 }\r\n" +
				"\telem = dict[\"john\"]\r\n");
	stmts.register(context);
	stmts.check(context);
	test.done();
};

