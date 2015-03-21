require("../../../../exploded");

var parseString = require("../BaseEParserTest").parseString;
var parseResource = require("../BaseEParserTest").parseResource;

exports.testEmpty = function(test) {
	var stmts = parseString("");
	test.ok(stmts);
	test.equal(0,stmts.length);
	test.done();
};


exports.testNative = function(test) {
	var stmts = parseResource("native/method.e");
	test.ok(stmts);
	test.equal(2,stmts.length);
	test.done();
};


exports.testSpecified = function(test) {
	var stmts = parseResource("methods/specified.e");
	test.ok(stmts);
	test.equal(6,stmts.length);
	test.done();
};


exports.testAttribute = function(test) {
	var stmts = parseResource("methods/attribute.e");
	test.ok(stmts);
	test.equal(6,stmts.length);
	test.done();
};


exports.testImplicit = function(test) {
	var stmts = parseResource("methods/implicit.e");
	test.ok(stmts);
	test.equal(6,stmts.length);
	test.done();
};


exports.testPolymorphicImplicit = function(test) {
	var stmts = parseResource("methods/polymorphic_implicit.e");
	test.ok(stmts);
	test.equal(12,stmts.length);
	test.done();
};

exports.testEnumeratedCategory = function(test) {
	var stmts = parseResource("enums/categoryEnum.e");
	test.ok(stmts);
	test.equal(5,stmts.length);
	test.done();
};

