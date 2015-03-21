require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testForward = function(test) {
	compareResourceOPO(test, "forward/forward.o");
};

