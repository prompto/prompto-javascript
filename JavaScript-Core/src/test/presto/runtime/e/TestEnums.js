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

exports.testCategoryEnum = function(test) {
	checkOutput(test, "enums/categoryEnum.pec");
};

exports.testIntegerEnum = function(test) {
	checkOutput(test, "enums/integerEnum.pec");
};

exports.testTextEnum = function(test) {
	checkOutput(test, "enums/textEnum.pec");
};

