require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testForward = function(test) {
	compareResourceOEO(test, "forward/forward.o");
};

