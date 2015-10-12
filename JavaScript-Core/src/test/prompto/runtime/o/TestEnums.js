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

exports.testCategoryEnum = function(test) {
	checkOutput(test, "enums/categoryEnum.poc");
};

exports.testIntegerEnum = function(test) {
	checkOutput(test, "enums/integerEnum.poc");
};

exports.testTextEnum = function(test) {
	checkOutput(test, "enums/textEnum.poc");
};

