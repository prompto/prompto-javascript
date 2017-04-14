require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDateDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateDayOfMonth.poc");
};

exports.testDateDayOfYear = function(test) {
	checkOutput(test, "builtins/dateDayOfYear.poc");
};

exports.testDateMonth = function(test) {
	checkOutput(test, "builtins/dateMonth.poc");
};

exports.testDateTimeDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testDateTimeDayOfYear = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testDateTimeHour = function(test) {
	checkOutput(test, "builtins/dateTimeHour.poc");
};

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.poc");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.poc");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.poc");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.poc");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.poc");
};

exports.testDictCount = function(test) {
	checkOutput(test, "builtins/dictCount.poc");
};

exports.testEnumName = function(test) {
	checkOutput(test, "builtins/enumName.poc");
};

exports.testEnumSymbols = function(test) {
	checkOutput(test, "builtins/enumSymbols.poc");
};

exports.testEnumValue = function(test) {
	checkOutput(test, "builtins/enumValue.poc");
};

exports.testIntegerFormat = function(test) {
	checkOutput(test, "builtins/integerFormat.poc");
};

exports.testListCount = function(test) {
	checkOutput(test, "builtins/listCount.poc");
};

exports.testSetCount = function(test) {
	checkOutput(test, "builtins/setCount.poc");
};

exports.testTextCapitalize = function(test) {
	checkOutput(test, "builtins/textCapitalize.poc");
};

exports.testTextCount = function(test) {
	checkOutput(test, "builtins/textCount.poc");
};

exports.testTextLowercase = function(test) {
	checkOutput(test, "builtins/textLowercase.poc");
};

exports.testTextReplace = function(test) {
	checkOutput(test, "builtins/textReplace.poc");
};

exports.testTextSplit = function(test) {
	checkOutput(test, "builtins/textSplit.poc");
};

exports.testTextTrim = function(test) {
	checkOutput(test, "builtins/textTrim.poc");
};

exports.testTextUppercase = function(test) {
	checkOutput(test, "builtins/textUppercase.poc");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.poc");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.poc");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.poc");
};

exports.testTupleCount = function(test) {
	checkOutput(test, "builtins/tupleCount.poc");
};

