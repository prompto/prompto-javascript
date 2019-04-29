require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testComment = function(test) {
	compareResourceEME(test, "comment/comment.pec");
};

