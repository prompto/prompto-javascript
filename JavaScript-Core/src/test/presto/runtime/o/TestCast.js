require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAutoDowncast = function(test) {
	checkOutput(test, "cast/autoDowncast.poc");
};

exports.testCastChild = function(test) {
	checkOutput(test, "cast/castChild.poc");
};

exports.testIsAChild = function(test) {
	checkOutput(test, "cast/isAChild.poc");
};

exports.testIsAText = function(test) {
	checkOutput(test, "cast/isAText.poc");
};

