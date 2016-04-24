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

exports.testAutoDowncast = function(test) {
	checkOutput(test, "cast/autoDowncast.pec");
};

exports.testCastChild = function(test) {
	checkOutput(test, "cast/castChild.pec");
};

exports.testCastMissing = function(test) {
	checkOutput(test, "cast/castMissing.pec");
};

exports.testCastNull = function(test) {
	checkOutput(test, "cast/castNull.pec");
};

exports.testIsAChild = function(test) {
	checkOutput(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	checkOutput(test, "cast/isAText.pec");
};

