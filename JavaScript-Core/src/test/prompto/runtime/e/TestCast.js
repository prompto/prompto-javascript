// generated: 2015-07-05T23:01:01.997
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

exports.testIsAChild = function(test) {
	checkOutput(test, "cast/isAChild.pec");
};

exports.testIsAText = function(test) {
	checkOutput(test, "cast/isAText.pec");
};

