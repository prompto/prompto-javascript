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
	checkOutput(test, "enums/categoryEnum.o");
};

exports.testIntegerEnum = function(test) {
	checkOutput(test, "enums/integerEnum.o");
};

exports.testTextEnum = function(test) {
	checkOutput(test, "enums/textEnum.o");
};

