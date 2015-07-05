// generated: 2015-07-05T23:01:02.175
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

exports.testGetterCall = function(test) {
	checkOutput(test, "setters/getterCall.pec");
};

exports.testSetter = function(test) {
	checkOutput(test, "setters/setter.pec");
};

