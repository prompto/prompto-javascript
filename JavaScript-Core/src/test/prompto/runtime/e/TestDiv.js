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
	checkOutput(test, "div/divDecimal.pec");
};

exports.testDivInteger = function(test) {
	checkOutput(test, "div/divInteger.pec");
};

exports.testIdivInteger = function(test) {
	checkOutput(test, "div/idivInteger.pec");
};

exports.testModInteger = function(test) {
	checkOutput(test, "div/modInteger.pec");
};

