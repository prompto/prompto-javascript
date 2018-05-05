require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedDateDayOfMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateDayOfMonth.poc");
};

exports.testTranspiledDateDayOfMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateDayOfMonth.poc");
};

exports.testInterpretedDateDayOfYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateDayOfYear.poc");
};

exports.testTranspiledDateDayOfYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateDayOfYear.poc");
};

exports.testInterpretedDateMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateMonth.poc");
};

exports.testTranspiledDateMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateMonth.poc");
};

exports.testInterpretedDateTimeDayOfMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testTranspiledDateTimeDayOfMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testInterpretedDateTimeDayOfYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testTranspiledDateTimeDayOfYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testInterpretedDateTimeHour = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeHour.poc");
};

exports.testTranspiledDateTimeHour = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeHour.poc");
};

exports.testInterpretedDateTimeMinute = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeMinute.poc");
};

exports.testTranspiledDateTimeMinute = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeMinute.poc");
};

exports.testInterpretedDateTimeMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeMonth.poc");
};

exports.testTranspiledDateTimeMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeMonth.poc");
};

exports.testInterpretedDateTimeSecond = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeSecond.poc");
};

exports.testTranspiledDateTimeSecond = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeSecond.poc");
};

exports.testInterpretedDateTimeYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeYear.poc");
};

exports.testTranspiledDateTimeYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeYear.poc");
};

exports.testInterpretedDateYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateYear.poc");
};

exports.testTranspiledDateYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateYear.poc");
};

exports.testInterpretedDictCount = function(test) {
	checkInterpretedOutput(test, "builtins/dictCount.poc");
};

exports.testTranspiledDictCount = function(test) {
	checkTranspiledOutput(test, "builtins/dictCount.poc");
};

exports.testInterpretedEnumName = function(test) {
	checkInterpretedOutput(test, "builtins/enumName.poc");
};

exports.testTranspiledEnumName = function(test) {
	checkTranspiledOutput(test, "builtins/enumName.poc");
};

exports.testInterpretedEnumSymbols = function(test) {
	checkInterpretedOutput(test, "builtins/enumSymbols.poc");
};

exports.testTranspiledEnumSymbols = function(test) {
	checkTranspiledOutput(test, "builtins/enumSymbols.poc");
};

exports.testInterpretedEnumValue = function(test) {
	checkInterpretedOutput(test, "builtins/enumValue.poc");
};

exports.testTranspiledEnumValue = function(test) {
	checkTranspiledOutput(test, "builtins/enumValue.poc");
};

exports.testInterpretedIntegerFormat = function(test) {
	checkInterpretedOutput(test, "builtins/integerFormat.poc");
};

exports.testTranspiledIntegerFormat = function(test) {
	checkTranspiledOutput(test, "builtins/integerFormat.poc");
};

exports.testInterpretedListCount = function(test) {
	checkInterpretedOutput(test, "builtins/listCount.poc");
};

exports.testTranspiledListCount = function(test) {
	checkTranspiledOutput(test, "builtins/listCount.poc");
};

exports.testInterpretedSetCount = function(test) {
	checkInterpretedOutput(test, "builtins/setCount.poc");
};

exports.testTranspiledSetCount = function(test) {
	checkTranspiledOutput(test, "builtins/setCount.poc");
};

exports.testInterpretedTextCapitalize = function(test) {
	checkInterpretedOutput(test, "builtins/textCapitalize.poc");
};

exports.testTranspiledTextCapitalize = function(test) {
	checkTranspiledOutput(test, "builtins/textCapitalize.poc");
};

exports.testInterpretedTextCount = function(test) {
	checkInterpretedOutput(test, "builtins/textCount.poc");
};

exports.testTranspiledTextCount = function(test) {
	checkTranspiledOutput(test, "builtins/textCount.poc");
};

exports.testInterpretedTextLowercase = function(test) {
	checkInterpretedOutput(test, "builtins/textLowercase.poc");
};

exports.testTranspiledTextLowercase = function(test) {
	checkTranspiledOutput(test, "builtins/textLowercase.poc");
};

exports.testInterpretedTextReplace = function(test) {
	checkInterpretedOutput(test, "builtins/textReplace.poc");
};

exports.testTranspiledTextReplace = function(test) {
	checkTranspiledOutput(test, "builtins/textReplace.poc");
};

exports.testInterpretedTextReplaceAll = function(test) {
	checkInterpretedOutput(test, "builtins/textReplaceAll.poc");
};

exports.testTranspiledTextReplaceAll = function(test) {
	checkTranspiledOutput(test, "builtins/textReplaceAll.poc");
};

exports.testInterpretedTextSplit = function(test) {
	checkInterpretedOutput(test, "builtins/textSplit.poc");
};

exports.testTranspiledTextSplit = function(test) {
	checkTranspiledOutput(test, "builtins/textSplit.poc");
};

exports.testInterpretedTextTrim = function(test) {
	checkInterpretedOutput(test, "builtins/textTrim.poc");
};

exports.testTranspiledTextTrim = function(test) {
	checkTranspiledOutput(test, "builtins/textTrim.poc");
};

exports.testInterpretedTextUppercase = function(test) {
	checkInterpretedOutput(test, "builtins/textUppercase.poc");
};

exports.testTranspiledTextUppercase = function(test) {
	checkTranspiledOutput(test, "builtins/textUppercase.poc");
};

exports.testInterpretedTimeHour = function(test) {
	checkInterpretedOutput(test, "builtins/timeHour.poc");
};

exports.testTranspiledTimeHour = function(test) {
	checkTranspiledOutput(test, "builtins/timeHour.poc");
};

exports.testInterpretedTimeMinute = function(test) {
	checkInterpretedOutput(test, "builtins/timeMinute.poc");
};

exports.testTranspiledTimeMinute = function(test) {
	checkTranspiledOutput(test, "builtins/timeMinute.poc");
};

exports.testInterpretedTimeSecond = function(test) {
	checkInterpretedOutput(test, "builtins/timeSecond.poc");
};

exports.testTranspiledTimeSecond = function(test) {
	checkTranspiledOutput(test, "builtins/timeSecond.poc");
};

exports.testInterpretedTupleCount = function(test) {
	checkInterpretedOutput(test, "builtins/tupleCount.poc");
};

exports.testTranspiledTupleCount = function(test) {
	checkTranspiledOutput(test, "builtins/tupleCount.poc");
};

