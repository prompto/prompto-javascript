require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseOParserTest").interpretResource;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;
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
		interpretResource("resourceError/badRead.poc");
	}, prompto.error.SyntaxError);
	test.done();
};



exports.testBadWrite = function(test) {
	test.throws( function() {
		interpretResource("resourceError/badWrite.poc");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
		interpretResource("resourceError/badResource.poc");
	}, prompto.error.SyntaxError);
	test.done();
};
