require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseEParserTest").interpretResource;
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
        interpretResource("resourceError/badRead.pec");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadWrite = function(test) {
	test.throws( function() {
        interpretResource("resourceError/badWrite.pec");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
        interpretResource("resourceError/badResource.pec");
	}, prompto.error.SyntaxError);
	test.done();
};

