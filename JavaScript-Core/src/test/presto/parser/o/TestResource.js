require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var setContent = require("../../../user/MyResource").setContent;
var runResource = require("../../parser/BaseOParserTest").runResource;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;
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
		runResource("resource/badRead.o");
	}, presto.error.SyntaxError);
	test.done();
};



exports.testBadWrite = function(test) {
	test.throws( function() {
		runResource("resource/badWrite.o");
	}, presto.error.SyntaxError);
	test.done();
};


exports.testBadResource = function(test) {
	test.throws( function() {
		runResource("resource/badResource.o");
	}, presto.error.SyntaxError);
	test.done();
};

exports.testReadResource = function(test) {
	checkOutput(test, "resource/readResource.o");
}


exports.testWriteResource = function(test) {
	checkOutput(test, "resource/writeResource.o");
}

exports.testReadWithResource = function(test) {
	checkOutput(test, "resource/readWithResource.o");
}

exports.testWriteWithResource = function(test) {
	checkOutput(test, "resource/writeWithResource.o");
}

