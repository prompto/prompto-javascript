require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var setContent = require("../../../user/MyResource").setContent;
var runResource = require("../../parser/BaseEParserTest").runResource;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;
var presto = require("../../../../main/presto/index");

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
		runResource("resource/badRead.e");
	}, presto.error.SyntaxError);
	test.done();
};



exports.testBadWrite = function(test) {
	test.throws( function() {
		runResource("resource/badWrite.e");
	}, presto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
		runResource("resource/badResource.e");
	}, presto.error.SyntaxError);
	test.done();
};

exports.testReadResource = function(test) {
	checkOutput(test, "resource/readResource.e");
}


exports.testWriteResource = function(test) {
	checkOutput(test, "resource/writeResource.e");
}

exports.testReadWithResource = function(test) {
	checkOutput(test, "resource/readWithResource.e");
}

exports.testWriteWithResource = function(test) {
	checkOutput(test, "resource/writeWithResource.e");
}

