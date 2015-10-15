require("../../../../exploded");

var parseString = require("../BaseEParserTest").parseString;
var parseResource = require("../BaseEParserTest").parseResource;

exports.testEmpty = function(test) {
	var stmts = parseString("");
	test.ok(stmts);
	test.equal(0, stmts.length);
	test.done();
};


exports.testNative = function(test) {
	var stmts = parseResource("native/method.pec");
	test.ok(stmts);
	test.equal(2, stmts.length);
	test.done();
};


exports.testSpecified = function(test) {
	var stmts = parseResource("methods/specified.pec");
	test.ok(stmts);
	test.equal(6, stmts.length);
	test.done();
};


exports.testAttribute = function(test) {
	var stmts = parseResource("methods/attribute.pec");
	test.ok(stmts);
	test.equal(6, stmts.length);
	test.done();
};


exports.testImplicit = function(test) {
	var stmts = parseResource("methods/implicit.pec");
	test.ok(stmts);
	test.equal(6, stmts.length);
	test.done();
};


exports.testPolymorphicImplicit = function(test) {
	var stmts = parseResource("methods/polymorphic_implicit.pec");
	test.ok(stmts);
	test.equal(12, stmts.length);
	test.done();
};

exports.testEnumeratedCategory = function(test) {
	var stmts = parseResource("enums/categoryEnum.pec");
	test.ok(stmts);
	test.equal(6, stmts.length);
	test.done();
};

