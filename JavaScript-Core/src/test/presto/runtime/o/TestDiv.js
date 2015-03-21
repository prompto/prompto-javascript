require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDivDecimal = function(test) {
	checkOutput(test, "div/divDecimal.o");
};

exports.testDivInteger = function(test) {
	checkOutput(test, "div/divInteger.o");
};

exports.testIdivInteger = function(test) {
	checkOutput(test, "div/idivInteger.o");
};

exports.testModInteger = function(test) {
	checkOutput(test, "div/modInteger.o");
};

