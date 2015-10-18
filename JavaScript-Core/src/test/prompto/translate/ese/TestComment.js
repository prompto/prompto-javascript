require("../../../../exploded");

var compareResourceESE = require("../../parser/BaseParserTest").compareResourceESE;

exports.testComment = function(test) {
	compareResourceESE(test, "comment/comment.pec");
};

