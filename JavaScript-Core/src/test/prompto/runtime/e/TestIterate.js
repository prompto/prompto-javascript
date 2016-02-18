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

exports.testForEachCategoryList = function(test) {
	checkOutput(test, "iterate/forEachCategoryList.pec");
};

exports.testForEachIntegerList = function(test) {
	checkOutput(test, "iterate/forEachIntegerList.pec");
};

