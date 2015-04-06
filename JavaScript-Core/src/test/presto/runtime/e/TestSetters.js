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

exports.testGetter = function(test) {
	checkOutput(test, "setters/getter.pec");
};

exports.testSetter = function(test) {
	checkOutput(test, "setters/setter.pec");
};

