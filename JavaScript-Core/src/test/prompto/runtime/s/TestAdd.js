// generated: 2015-10-06T23:17:33.307
require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseSParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testAddInteger = function(test) {
	checkOutput(test, "add/addInteger.psc");
};

