require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;

var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testInterpretedBooleanText = function(test) {
	checkInterpretedOutput(test, "builtins/booleanText.pec");
};

exports.testTranspiledBooleanText = function(test) {
	checkTranspiledOutput(test, "builtins/booleanText.pec");
};

exports.testInterpretedCategoryText = function(test) {
	checkInterpretedOutput(test, "builtins/categoryText.pec");
};

exports.testTranspiledCategoryText = function(test) {
	checkTranspiledOutput(test, "builtins/categoryText.pec");
};

exports.testInterpretedCharCodePoint = function(test) {
	checkInterpretedOutput(test, "builtins/charCodePoint.pec");
};

exports.testTranspiledCharCodePoint = function(test) {
	checkTranspiledOutput(test, "builtins/charCodePoint.pec");
};

exports.testInterpretedCharText = function(test) {
	checkInterpretedOutput(test, "builtins/charText.pec");
};

exports.testTranspiledCharText = function(test) {
	checkTranspiledOutput(test, "builtins/charText.pec");
};

exports.testInterpretedCursorToList = function(test) {
	checkInterpretedOutput(test, "builtins/cursorToList.pec");
};

exports.testTranspiledCursorToList = function(test) {
	checkTranspiledOutput(test, "builtins/cursorToList.pec");
};

exports.testInterpretedDateDayOfMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateDayOfMonth.pec");
};

exports.testTranspiledDateDayOfMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateDayOfMonth.pec");
};

exports.testInterpretedDateDayOfYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateDayOfYear.pec");
};

exports.testTranspiledDateDayOfYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateDayOfYear.pec");
};

exports.testInterpretedDateMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateMonth.pec");
};

exports.testTranspiledDateMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateMonth.pec");
};

exports.testInterpretedDateText = function(test) {
	checkInterpretedOutput(test, "builtins/dateText.pec");
};

exports.testTranspiledDateText = function(test) {
	checkTranspiledOutput(test, "builtins/dateText.pec");
};

exports.testInterpretedDateTimeDate = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeDate.pec");
};

exports.testTranspiledDateTimeDate = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeDate.pec");
};

exports.testInterpretedDateTimeDayOfMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeDayOfMonth.pec");
};

exports.testTranspiledDateTimeDayOfMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeDayOfMonth.pec");
};

exports.testInterpretedDateTimeDayOfYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeDayOfYear.pec");
};

exports.testTranspiledDateTimeDayOfYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeDayOfYear.pec");
};

exports.testInterpretedDateTimeHour = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeHour.pec");
};

exports.testTranspiledDateTimeHour = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeHour.pec");
};

exports.testInterpretedDateTimeMilli = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeMilli.pec");
};

exports.testTranspiledDateTimeMilli = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeMilli.pec");
};

exports.testInterpretedDateTimeMinute = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeMinute.pec");
};

exports.testTranspiledDateTimeMinute = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeMinute.pec");
};

exports.testInterpretedDateTimeMonth = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeMonth.pec");
};

exports.testTranspiledDateTimeMonth = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeMonth.pec");
};

exports.testInterpretedDateTimeSecond = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeSecond.pec");
};

exports.testTranspiledDateTimeSecond = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeSecond.pec");
};

exports.testInterpretedDateTimeText = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeText.pec");
};

exports.testTranspiledDateTimeText = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeText.pec");
};

exports.testInterpretedDateTimeTime = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeTime.pec");
};

exports.testTranspiledDateTimeTime = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeTime.pec");
};

exports.testInterpretedDateTimeYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateTimeYear.pec");
};

exports.testTranspiledDateTimeYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateTimeYear.pec");
};

exports.testInterpretedDateYear = function(test) {
	checkInterpretedOutput(test, "builtins/dateYear.pec");
};

exports.testTranspiledDateYear = function(test) {
	checkTranspiledOutput(test, "builtins/dateYear.pec");
};

exports.testInterpretedDecimalText = function(test) {
	checkInterpretedOutput(test, "builtins/decimalText.pec");
};

exports.testTranspiledDecimalText = function(test) {
	checkTranspiledOutput(test, "builtins/decimalText.pec");
};

exports.testInterpretedDictCount = function(test) {
	checkInterpretedOutput(test, "builtins/dictCount.pec");
};

exports.testTranspiledDictCount = function(test) {
	checkTranspiledOutput(test, "builtins/dictCount.pec");
};

exports.testInterpretedDictKeys = function(test) {
	checkInterpretedOutput(test, "builtins/dictKeys.pec");
};

exports.testTranspiledDictKeys = function(test) {
	checkTranspiledOutput(test, "builtins/dictKeys.pec");
};

exports.testInterpretedDictText = function(test) {
	checkInterpretedOutput(test, "builtins/dictText.pec");
};

exports.testTranspiledDictText = function(test) {
	checkTranspiledOutput(test, "builtins/dictText.pec");
};

exports.testInterpretedDictValues = function(test) {
	checkInterpretedOutput(test, "builtins/dictValues.pec");
};

exports.testTranspiledDictValues = function(test) {
	checkTranspiledOutput(test, "builtins/dictValues.pec");
};

exports.testInterpretedDocumentText = function(test) {
	checkInterpretedOutput(test, "builtins/documentText.pec");
};

exports.testTranspiledDocumentText = function(test) {
	checkTranspiledOutput(test, "builtins/documentText.pec");
};

exports.testInterpretedEnumName = function(test) {
	checkInterpretedOutput(test, "builtins/enumName.pec");
};

exports.testTranspiledEnumName = function(test) {
	checkTranspiledOutput(test, "builtins/enumName.pec");
};

exports.testInterpretedEnumSymbols = function(test) {
	checkInterpretedOutput(test, "builtins/enumSymbols.pec");
};

exports.testTranspiledEnumSymbols = function(test) {
	checkTranspiledOutput(test, "builtins/enumSymbols.pec");
};

exports.testInterpretedEnumValue = function(test) {
	checkInterpretedOutput(test, "builtins/enumValue.pec");
};

exports.testTranspiledEnumValue = function(test) {
	checkTranspiledOutput(test, "builtins/enumValue.pec");
};

exports.testInterpretedIntegerFormat = function(test) {
	checkInterpretedOutput(test, "builtins/integerFormat.pec");
};

exports.testTranspiledIntegerFormat = function(test) {
	checkTranspiledOutput(test, "builtins/integerFormat.pec");
};

exports.testInterpretedIntegerText = function(test) {
	checkInterpretedOutput(test, "builtins/integerText.pec");
};

exports.testTranspiledIntegerText = function(test) {
	checkTranspiledOutput(test, "builtins/integerText.pec");
};

exports.testInterpretedListCount = function(test) {
	checkInterpretedOutput(test, "builtins/listCount.pec");
};

exports.testTranspiledListCount = function(test) {
	checkTranspiledOutput(test, "builtins/listCount.pec");
};

exports.testInterpretedListText = function(test) {
	checkInterpretedOutput(test, "builtins/listText.pec");
};

exports.testTranspiledListText = function(test) {
	checkTranspiledOutput(test, "builtins/listText.pec");
};

exports.testInterpretedPeriodText = function(test) {
	checkInterpretedOutput(test, "builtins/periodText.pec");
};

exports.testTranspiledPeriodText = function(test) {
	checkTranspiledOutput(test, "builtins/periodText.pec");
};

exports.testInterpretedSetCount = function(test) {
	checkInterpretedOutput(test, "builtins/setCount.pec");
};

exports.testTranspiledSetCount = function(test) {
	checkTranspiledOutput(test, "builtins/setCount.pec");
};

exports.testInterpretedSetText = function(test) {
	checkInterpretedOutput(test, "builtins/setText.pec");
};

exports.testTranspiledSetText = function(test) {
	checkTranspiledOutput(test, "builtins/setText.pec");
};

exports.testInterpretedTextCapitalize = function(test) {
	checkInterpretedOutput(test, "builtins/textCapitalize.pec");
};

exports.testTranspiledTextCapitalize = function(test) {
	checkTranspiledOutput(test, "builtins/textCapitalize.pec");
};

exports.testInterpretedTextCount = function(test) {
	checkInterpretedOutput(test, "builtins/textCount.pec");
};

exports.testTranspiledTextCount = function(test) {
	checkTranspiledOutput(test, "builtins/textCount.pec");
};

exports.testInterpretedTextEndsWith = function(test) {
	checkInterpretedOutput(test, "builtins/textEndsWith.pec");
};

exports.testTranspiledTextEndsWith = function(test) {
	checkTranspiledOutput(test, "builtins/textEndsWith.pec");
};

exports.testInterpretedTextLowercase = function(test) {
	checkInterpretedOutput(test, "builtins/textLowercase.pec");
};

exports.testTranspiledTextLowercase = function(test) {
	checkTranspiledOutput(test, "builtins/textLowercase.pec");
};

exports.testInterpretedTextReplace = function(test) {
	checkInterpretedOutput(test, "builtins/textReplace.pec");
};

exports.testTranspiledTextReplace = function(test) {
	checkTranspiledOutput(test, "builtins/textReplace.pec");
};

exports.testInterpretedTextReplaceAll = function(test) {
	checkInterpretedOutput(test, "builtins/textReplaceAll.pec");
};

exports.testTranspiledTextReplaceAll = function(test) {
	checkTranspiledOutput(test, "builtins/textReplaceAll.pec");
};

exports.testInterpretedTextSplit = function(test) {
	checkInterpretedOutput(test, "builtins/textSplit.pec");
};

exports.testTranspiledTextSplit = function(test) {
	checkTranspiledOutput(test, "builtins/textSplit.pec");
};

exports.testInterpretedTextStartsWith = function(test) {
	checkInterpretedOutput(test, "builtins/textStartsWith.pec");
};

exports.testTranspiledTextStartsWith = function(test) {
	checkTranspiledOutput(test, "builtins/textStartsWith.pec");
};

exports.testInterpretedTextText = function(test) {
	checkInterpretedOutput(test, "builtins/textText.pec");
};

exports.testTranspiledTextText = function(test) {
	checkTranspiledOutput(test, "builtins/textText.pec");
};

exports.testInterpretedTextTrim = function(test) {
	checkInterpretedOutput(test, "builtins/textTrim.pec");
};

exports.testTranspiledTextTrim = function(test) {
	checkTranspiledOutput(test, "builtins/textTrim.pec");
};

exports.testInterpretedTextUppercase = function(test) {
	checkInterpretedOutput(test, "builtins/textUppercase.pec");
};

exports.testTranspiledTextUppercase = function(test) {
	checkTranspiledOutput(test, "builtins/textUppercase.pec");
};

exports.testInterpretedTimeHour = function(test) {
	checkInterpretedOutput(test, "builtins/timeHour.pec");
};

exports.testTranspiledTimeHour = function(test) {
	checkTranspiledOutput(test, "builtins/timeHour.pec");
};

exports.testInterpretedTimeMilli = function(test) {
	checkInterpretedOutput(test, "builtins/timeMilli.pec");
};

exports.testTranspiledTimeMilli = function(test) {
	checkTranspiledOutput(test, "builtins/timeMilli.pec");
};

exports.testInterpretedTimeMinute = function(test) {
	checkInterpretedOutput(test, "builtins/timeMinute.pec");
};

exports.testTranspiledTimeMinute = function(test) {
	checkTranspiledOutput(test, "builtins/timeMinute.pec");
};

exports.testInterpretedTimeSecond = function(test) {
	checkInterpretedOutput(test, "builtins/timeSecond.pec");
};

exports.testTranspiledTimeSecond = function(test) {
	checkTranspiledOutput(test, "builtins/timeSecond.pec");
};

exports.testInterpretedTimeText = function(test) {
	checkInterpretedOutput(test, "builtins/timeText.pec");
};

exports.testTranspiledTimeText = function(test) {
	checkTranspiledOutput(test, "builtins/timeText.pec");
};

exports.testInterpretedTupleCount = function(test) {
	checkInterpretedOutput(test, "builtins/tupleCount.pec");
};

exports.testTranspiledTupleCount = function(test) {
	checkTranspiledOutput(test, "builtins/tupleCount.pec");
};

exports.testInterpretedTupleText = function(test) {
	checkInterpretedOutput(test, "builtins/tupleText.pec");
};

exports.testTranspiledTupleText = function(test) {
	checkTranspiledOutput(test, "builtins/tupleText.pec");
};

exports.testInterpretedUuidText = function(test) {
	checkInterpretedOutput(test, "builtins/uuidText.pec");
};

exports.testTranspiledUuidText = function(test) {
	checkTranspiledOutput(test, "builtins/uuidText.pec");
};

