require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var runResource = require("../../parser/BaseEParserTest").runResource;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;
var prompto = require("../../../../main/prompto/index");

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};


exports.testBadRead = function(test) {
	test.throws( function() {
		runResource("resourceError/badRead.pec");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadWrite = function(test) {
	test.throws( function() {
		runResource("resourceError/badWrite.pec");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
		runResource("resourceError/badResource.pec");
	}, prompto.error.SyntaxError);
	test.done();
};

