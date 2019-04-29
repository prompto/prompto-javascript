require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedAssignedReturn = function(test) {
	checkInterpretedOutput(test, "exit/assignedReturn.pec");
};

exports.testTranspiledAssignedReturn = function(test) {
	checkTranspiledOutput(test, "exit/assignedReturn.pec");
};

exports.testInterpretedAssignedReturnInDoWhile = function(test) {
	checkInterpretedOutput(test, "exit/assignedReturnInDoWhile.pec");
};

exports.testTranspiledAssignedReturnInDoWhile = function(test) {
	checkTranspiledOutput(test, "exit/assignedReturnInDoWhile.pec");
};

exports.testInterpretedAssignedReturnInForEach = function(test) {
	checkInterpretedOutput(test, "exit/assignedReturnInForEach.pec");
};

exports.testTranspiledAssignedReturnInForEach = function(test) {
	checkTranspiledOutput(test, "exit/assignedReturnInForEach.pec");
};

exports.testInterpretedAssignedReturnInIf = function(test) {
	checkInterpretedOutput(test, "exit/assignedReturnInIf.pec");
};

exports.testTranspiledAssignedReturnInIf = function(test) {
	checkTranspiledOutput(test, "exit/assignedReturnInIf.pec");
};

exports.testInterpretedAssignedReturnInWhile = function(test) {
	checkInterpretedOutput(test, "exit/assignedReturnInWhile.pec");
};

exports.testTranspiledAssignedReturnInWhile = function(test) {
	checkTranspiledOutput(test, "exit/assignedReturnInWhile.pec");
};

exports.testInterpretedUnassignedReturn = function(test) {
	checkInterpretedOutput(test, "exit/unassignedReturn.pec");
};

exports.testTranspiledUnassignedReturn = function(test) {
	checkTranspiledOutput(test, "exit/unassignedReturn.pec");
};

exports.testInterpretedUnassignedReturnInDoWhile = function(test) {
	checkInterpretedOutput(test, "exit/unassignedReturnInDoWhile.pec");
};

exports.testTranspiledUnassignedReturnInDoWhile = function(test) {
	checkTranspiledOutput(test, "exit/unassignedReturnInDoWhile.pec");
};

exports.testInterpretedUnassignedReturnInForEach = function(test) {
	checkInterpretedOutput(test, "exit/unassignedReturnInForEach.pec");
};

exports.testTranspiledUnassignedReturnInForEach = function(test) {
	checkTranspiledOutput(test, "exit/unassignedReturnInForEach.pec");
};

exports.testInterpretedUnassignedReturnInIf = function(test) {
	checkInterpretedOutput(test, "exit/unassignedReturnInIf.pec");
};

exports.testTranspiledUnassignedReturnInIf = function(test) {
	checkTranspiledOutput(test, "exit/unassignedReturnInIf.pec");
};

exports.testInterpretedUnassignedReturnInWhile = function(test) {
	checkInterpretedOutput(test, "exit/unassignedReturnInWhile.pec");
};

exports.testTranspiledUnassignedReturnInWhile = function(test) {
	checkTranspiledOutput(test, "exit/unassignedReturnInWhile.pec");
};

