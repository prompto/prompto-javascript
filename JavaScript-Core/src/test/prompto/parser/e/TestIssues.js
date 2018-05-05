require("../../../../exploded");

var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseEParserTest").interpretResource;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testMinimal = function(test) {
	interpretResource("issues/minimal.pec","main",null);
	test.done();
};
