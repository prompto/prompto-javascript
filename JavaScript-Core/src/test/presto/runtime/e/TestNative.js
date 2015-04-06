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

exports.testCategory = function(test) {
	checkOutput(test, "native/category.pec");
};

exports.testMethod = function(test) {
	checkOutput(test, "native/method.pec");
};

