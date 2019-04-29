require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testAssignedReturn = function(test) {
	compareResourceEME(test, "exit/assignedReturn.pec");
};

exports.testAssignedReturnInDoWhile = function(test) {
	compareResourceEME(test, "exit/assignedReturnInDoWhile.pec");
};

exports.testAssignedReturnInForEach = function(test) {
	compareResourceEME(test, "exit/assignedReturnInForEach.pec");
};

exports.testAssignedReturnInIf = function(test) {
	compareResourceEME(test, "exit/assignedReturnInIf.pec");
};

exports.testAssignedReturnInWhile = function(test) {
	compareResourceEME(test, "exit/assignedReturnInWhile.pec");
};

exports.testUnassignedReturn = function(test) {
	compareResourceEME(test, "exit/unassignedReturn.pec");
};

exports.testUnassignedReturnInDoWhile = function(test) {
	compareResourceEME(test, "exit/unassignedReturnInDoWhile.pec");
};

exports.testUnassignedReturnInForEach = function(test) {
	compareResourceEME(test, "exit/unassignedReturnInForEach.pec");
};

exports.testUnassignedReturnInIf = function(test) {
	compareResourceEME(test, "exit/unassignedReturnInIf.pec");
};

exports.testUnassignedReturnInWhile = function(test) {
	compareResourceEME(test, "exit/unassignedReturnInWhile.pec");
};

