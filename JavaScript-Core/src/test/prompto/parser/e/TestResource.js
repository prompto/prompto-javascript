require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var setContent = require("../../../user/MyResource").setContent;
var runResource = require("../../parser/BaseEParserTest").runResource;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;
var prompto = require("../../../../main/prompto/index");

exports.setUp = function(done) {
	Out.init();
	setContent("readFullyOk");
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};


exports.testBadRead = function(test) {
	test.throws( function() {
		runResource("resource/badRead.pec");
	}, prompto.error.SyntaxError);
	test.done();
};



exports.testBadWrite = function(test) {
	test.throws( function() {
		runResource("resource/badWrite.pec");
	}, prompto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
		runResource("resource/badResource.pec");
	}, prompto.error.SyntaxError);
	test.done();
};

exports.testReadResource = function(test) {
	checkOutput(test, "resource/readResource.pec");
}


exports.testWriteResource = function(test) {
	checkOutput(test, "resource/writeResource.pec");
}

exports.testReadWithResource = function(test) {
	checkOutput(test, "resource/readWithResource.pec");
}

exports.testWriteWithResource = function(test) {
	checkOutput(test, "resource/writeWithResource.pec");
}

