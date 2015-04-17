require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var runResource = require("../../parser/BaseEParserTest").runResource;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testNativePrint = function(test) {
    runResource("native/print.pec");
    test.equal(Out.read(), "name=IBM");
	test.done();
};
