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
	checkOutput(test, "cast/autoDowncast.e");
};

exports.testCastChild = function(test) {
	checkOutput(test, "cast/castChild.e");
};

exports.testIsAChild = function(test) {
	checkOutput(test, "cast/isAChild.e");
};

exports.testIsAText = function(test) {
	checkOutput(test, "cast/isAText.e");
};

