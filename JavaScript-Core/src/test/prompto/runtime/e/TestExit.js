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

exports.testAssignedReturn = function(test) {
	checkOutput(test, "exit/assignedReturn.pec");
};

exports.testAssignedReturnInDoWhile = function(test) {
	checkOutput(test, "exit/assignedReturnInDoWhile.pec");
};

exports.testAssignedReturnInForEach = function(test) {
	checkOutput(test, "exit/assignedReturnInForEach.pec");
};

exports.testAssignedReturnInIf = function(test) {
	checkOutput(test, "exit/assignedReturnInIf.pec");
};

exports.testAssignedReturnInWhile = function(test) {
	checkOutput(test, "exit/assignedReturnInWhile.pec");
};

exports.testUnassignedReturn = function(test) {
	checkOutput(test, "exit/unassignedReturn.pec");
};

exports.testUnassignedReturnInDoWhile = function(test) {
	checkOutput(test, "exit/unassignedReturnInDoWhile.pec");
};

exports.testUnassignedReturnInForEach = function(test) {
	checkOutput(test, "exit/unassignedReturnInForEach.pec");
};

exports.testUnassignedReturnInIf = function(test) {
	checkOutput(test, "exit/unassignedReturnInIf.pec");
};

exports.testUnassignedReturnInWhile = function(test) {
	checkOutput(test, "exit/unassignedReturnInWhile.pec");
};

