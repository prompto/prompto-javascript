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

exports.testGlobalClosureNoArg = function(test) {
	checkOutput(test, "closures/globalClosureNoArg.pec");
};

exports.testGlobalClosureWithArg = function(test) {
	checkOutput(test, "closures/globalClosureWithArg.pec");
};

exports.testInstanceClosureNoArg = function(test) {
	checkOutput(test, "closures/instanceClosureNoArg.pec");
};

exports.testParameterClosure = function(test) {
	checkOutput(test, "closures/parameterClosure.pec");
};

