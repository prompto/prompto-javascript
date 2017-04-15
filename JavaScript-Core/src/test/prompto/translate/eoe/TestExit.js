require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testAssignedReturn = function(test) {
	compareResourceEOE(test, "exit/assignedReturn.pec");
};

exports.testAssignedReturnInDoWhile = function(test) {
	compareResourceEOE(test, "exit/assignedReturnInDoWhile.pec");
};

exports.testAssignedReturnInForEach = function(test) {
	compareResourceEOE(test, "exit/assignedReturnInForEach.pec");
};

exports.testAssignedReturnInIf = function(test) {
	compareResourceEOE(test, "exit/assignedReturnInIf.pec");
};

exports.testAssignedReturnInWhile = function(test) {
	compareResourceEOE(test, "exit/assignedReturnInWhile.pec");
};

exports.testUnassignedReturn = function(test) {
	compareResourceEOE(test, "exit/unassignedReturn.pec");
};

exports.testUnassignedReturnInDoWhile = function(test) {
	compareResourceEOE(test, "exit/unassignedReturnInDoWhile.pec");
};

exports.testUnassignedReturnInForEach = function(test) {
	compareResourceEOE(test, "exit/unassignedReturnInForEach.pec");
};

exports.testUnassignedReturnInIf = function(test) {
	compareResourceEOE(test, "exit/unassignedReturnInIf.pec");
};

exports.testUnassignedReturnInWhile = function(test) {
	compareResourceEOE(test, "exit/unassignedReturnInWhile.pec");
};

