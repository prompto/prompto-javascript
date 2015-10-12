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

exports.testAndBoolean = function(test) {
	checkOutput(test, "logic/andBoolean.pec");
};

exports.testNotBoolean = function(test) {
	checkOutput(test, "logic/notBoolean.pec");
};

exports.testOrBoolean = function(test) {
	checkOutput(test, "logic/orBoolean.pec");
};

