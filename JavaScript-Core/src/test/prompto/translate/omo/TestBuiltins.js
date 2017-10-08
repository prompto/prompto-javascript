require("../../../../exploded");

var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

exports.testDateDayOfMonth = function(test) {
	compareResourceOMO(test, "builtins/dateDayOfMonth.poc");
};

exports.testDateDayOfYear = function(test) {
	compareResourceOMO(test, "builtins/dateDayOfYear.poc");
};

exports.testDateMonth = function(test) {
	compareResourceOMO(test, "builtins/dateMonth.poc");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceOMO(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceOMO(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testDateTimeHour = function(test) {
	compareResourceOMO(test, "builtins/dateTimeHour.poc");
};

exports.testDateTimeMinute = function(test) {
	compareResourceOMO(test, "builtins/dateTimeMinute.poc");
};

exports.testDateTimeMonth = function(test) {
	compareResourceOMO(test, "builtins/dateTimeMonth.poc");
};

exports.testDateTimeSecond = function(test) {
	compareResourceOMO(test, "builtins/dateTimeSecond.poc");
};

exports.testDateTimeTZName = function(test) {
	compareResourceOMO(test, "builtins/dateTimeTZName.poc");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceOMO(test, "builtins/dateTimeTZOffset.poc");
};

exports.testDateTimeYear = function(test) {
	compareResourceOMO(test, "builtins/dateTimeYear.poc");
};

exports.testDateYear = function(test) {
	compareResourceOMO(test, "builtins/dateYear.poc");
};

exports.testDictCount = function(test) {
	compareResourceOMO(test, "builtins/dictCount.poc");
};

exports.testEnumName = function(test) {
	compareResourceOMO(test, "builtins/enumName.poc");
};

exports.testEnumSymbols = function(test) {
	compareResourceOMO(test, "builtins/enumSymbols.poc");
};

exports.testEnumValue = function(test) {
	compareResourceOMO(test, "builtins/enumValue.poc");
};

exports.testIntegerFormat = function(test) {
	compareResourceOMO(test, "builtins/integerFormat.poc");
};

exports.testListCount = function(test) {
	compareResourceOMO(test, "builtins/listCount.poc");
};

exports.testSetCount = function(test) {
	compareResourceOMO(test, "builtins/setCount.poc");
};

exports.testTextCapitalize = function(test) {
	compareResourceOMO(test, "builtins/textCapitalize.poc");
};

exports.testTextCount = function(test) {
	compareResourceOMO(test, "builtins/textCount.poc");
};

exports.testTextLowercase = function(test) {
	compareResourceOMO(test, "builtins/textLowercase.poc");
};

exports.testTextReplace = function(test) {
	compareResourceOMO(test, "builtins/textReplace.poc");
};

exports.testTextReplaceAll = function(test) {
	compareResourceOMO(test, "builtins/textReplaceAll.poc");
};

exports.testTextSplit = function(test) {
	compareResourceOMO(test, "builtins/textSplit.poc");
};

exports.testTextTrim = function(test) {
	compareResourceOMO(test, "builtins/textTrim.poc");
};

exports.testTextUppercase = function(test) {
	compareResourceOMO(test, "builtins/textUppercase.poc");
};

exports.testTimeHour = function(test) {
	compareResourceOMO(test, "builtins/timeHour.poc");
};

exports.testTimeMinute = function(test) {
	compareResourceOMO(test, "builtins/timeMinute.poc");
};

exports.testTimeSecond = function(test) {
	compareResourceOMO(test, "builtins/timeSecond.poc");
};

exports.testTupleCount = function(test) {
	compareResourceOMO(test, "builtins/tupleCount.poc");
};

