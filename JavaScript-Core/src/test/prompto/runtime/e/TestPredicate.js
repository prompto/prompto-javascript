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
/*
exports.testContainsItem = function(test) {
	checkOutput(test, "predicate/containsItem.pec");
};

exports.testEquals = function(test) {
	checkOutput(test, "predicate/equals.pec");
};

exports.testGreater = function(test) {
	checkOutput(test, "predicate/greater.pec");
};

exports.testInList = function(test) {
	checkOutput(test, "predicate/inList.pec");
};

exports.testLesser = function(test) {
	checkOutput(test, "predicate/lesser.pec");
};

exports.testNotEquals = function(test) {
	checkOutput(test, "predicate/notEquals.pec");
};

exports.testPartial = function(test) {
	checkOutput(test, "predicate/partial.pec");
};
*/
exports.testRoughly = function(test) {
	checkOutput(test, "predicate/roughly.pec");
};
