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

exports.testGetter = function(test) {
	checkOutput(test, "setters/getter.o");
};

exports.testSetter = function(test) {
	checkOutput(test, "setters/setter.o");
};

