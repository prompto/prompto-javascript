require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testComment = function(test) {
	compareResourceEOE(test, "comment/comment.pec");
};

