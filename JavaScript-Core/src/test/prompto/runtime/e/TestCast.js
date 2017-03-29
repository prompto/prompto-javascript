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

exports.testAutoDecimalCast = function(test) {
	checkOutput(test, "cast/autoDecimalCast.pec");
};

exports.testAutoDowncast = function(test) {
	checkOutput(test, "cast/autoDowncast.pec");
};

exports.testAutoIntegerCast = function(test) {
	checkOutput(test, "cast/autoIntegerCast.pec");
};

exports.testCastChild = function(test) {
	checkOutput(test, "cast/castChild.pec");
};

exports.testCastDecimal = function(test) {
	checkOutput(test, "cast/castDecimal.pec");
};

exports.testCastDocument = function(test) {
	checkOutput(test, "cast/castDocument.pec");
};

exports.testCastInteger = function(test) {
	checkOutput(test, "cast/castInteger.pec");
};

exports.testCastMissing = function(test) {
	checkOutput(test, "cast/castMissing.pec");
};

exports.testCastNull = function(test) {
	checkOutput(test, "cast/castNull.pec");
};

exports.testCastRoot = function(test) {
	checkOutput(test, "cast/castRoot.pec");
};

exports.testIsAChild = function(test) {
	checkOutput(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	checkOutput(test, "cast/isAText.pec");
};

