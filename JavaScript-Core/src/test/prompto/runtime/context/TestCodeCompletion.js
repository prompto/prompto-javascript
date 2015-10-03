require("../../../../exploded");
var checkCompletion = require("../../parser/BaseEParserTest").checkCompletion;
var checkCompletionAt = require("../../parser/BaseEParserTest").checkCompletionAt;

exports.testNoError = function(test) {
    var code = "define name as Text attribute\n";
    checkCompletion(test, code);
};

exports.testMissingType = function(test) {
    var code = "define name as";
    checkCompletion(test, code, ["Text", "Integer", "Date"]);
};

exports.testOverride = function(test) {
    var code = "define name as Text attribute\n";
    checkCompletionAt(test, code, 1, 16, ["Text", "Integer", "Date"]);
};

