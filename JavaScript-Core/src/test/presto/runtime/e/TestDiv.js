require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDivDecimal = function(test) {
	checkOutput(test, "div/divDecimal.e");
};

exports.testDivInteger = function(test) {
	checkOutput(test, "div/divInteger.e");
};

exports.testIdivInteger = function(test) {
	checkOutput(test, "div/idivInteger.e");
};

exports.testModInteger = function(test) {
	checkOutput(test, "div/modInteger.e");
};

