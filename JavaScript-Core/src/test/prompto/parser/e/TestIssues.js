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

exports.testMinimal = function(test) {
	runResource("issues/minimal.pec","main",null);
	test.done();
};
