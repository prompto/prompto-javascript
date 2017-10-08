require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseEParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testBooleanText = function(test) {
	checkOutput(test, "builtins/booleanText.pec");
};

exports.testCategoryText = function(test) {
	checkOutput(test, "builtins/categoryText.pec");
};

exports.testCharCodePoint = function(test) {
	checkOutput(test, "builtins/charCodePoint.pec");
};

exports.testCharText = function(test) {
	checkOutput(test, "builtins/charText.pec");
};

exports.testDateDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateDayOfMonth.pec");
};

exports.testDateDayOfYear = function(test) {
	checkOutput(test, "builtins/dateDayOfYear.pec");
};

exports.testDateMonth = function(test) {
	checkOutput(test, "builtins/dateMonth.pec");
};

exports.testDateText = function(test) {
	checkOutput(test, "builtins/dateText.pec");
};

exports.testDateTimeDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfMonth.pec");
};

exports.testDateTimeDayOfYear = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfYear.pec");
};

exports.testDateTimeHour = function(test) {
	checkOutput(test, "builtins/dateTimeHour.pec");
};

exports.testDateTimeMilli = function(test) {
	checkOutput(test, "builtins/dateTimeMilli.pec");
};

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.pec");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.pec");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.pec");
};

exports.testDateTimeText = function(test) {
	checkOutput(test, "builtins/dateTimeText.pec");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.pec");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.pec");
};

exports.testDecimalText = function(test) {
	checkOutput(test, "builtins/decimalText.pec");
};

exports.testDictCount = function(test) {
	checkOutput(test, "builtins/dictCount.pec");
};

exports.testDictKeys = function(test) {
	checkOutput(test, "builtins/dictKeys.pec");
};

exports.testDictText = function(test) {
	checkOutput(test, "builtins/dictText.pec");
};

exports.testDictValues = function(test) {
	checkOutput(test, "builtins/dictValues.pec");
};

exports.testDocumentText = function(test) {
	checkOutput(test, "builtins/documentText.pec");
};

exports.testEnumName = function(test) {
	checkOutput(test, "builtins/enumName.pec");
};

exports.testEnumSymbols = function(test) {
	checkOutput(test, "builtins/enumSymbols.pec");
};

exports.testEnumValue = function(test) {
	checkOutput(test, "builtins/enumValue.pec");
};

exports.testIntegerFormat = function(test) {
	checkOutput(test, "builtins/integerFormat.pec");
};

exports.testIntegerText = function(test) {
	checkOutput(test, "builtins/integerText.pec");
};

exports.testListCount = function(test) {
	checkOutput(test, "builtins/listCount.pec");
};

exports.testListText = function(test) {
	checkOutput(test, "builtins/listText.pec");
};

exports.testPeriodText = function(test) {
	checkOutput(test, "builtins/periodText.pec");
};

exports.testSetCount = function(test) {
	checkOutput(test, "builtins/setCount.pec");
};

exports.testSetText = function(test) {
	checkOutput(test, "builtins/setText.pec");
};

exports.testTextCapitalize = function(test) {
	checkOutput(test, "builtins/textCapitalize.pec");
};

exports.testTextCount = function(test) {
	checkOutput(test, "builtins/textCount.pec");
};

exports.testTextLowercase = function(test) {
	checkOutput(test, "builtins/textLowercase.pec");
};

exports.testTextReplace = function(test) {
	checkOutput(test, "builtins/textReplace.pec");
};

exports.testTextReplaceAll = function(test) {
	checkOutput(test, "builtins/textReplaceAll.pec");
};

exports.testTextSplit = function(test) {
	checkOutput(test, "builtins/textSplit.pec");
};

exports.testTextText = function(test) {
	checkOutput(test, "builtins/textText.pec");
};

exports.testTextTrim = function(test) {
	checkOutput(test, "builtins/textTrim.pec");
};

exports.testTextUppercase = function(test) {
	checkOutput(test, "builtins/textUppercase.pec");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.pec");
};

exports.testTimeMilli = function(test) {
	checkOutput(test, "builtins/timeMilli.pec");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.pec");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.pec");
};

exports.testTimeText = function(test) {
	checkOutput(test, "builtins/timeText.pec");
};

exports.testTupleCount = function(test) {
	checkOutput(test, "builtins/tupleCount.pec");
};

exports.testTupleText = function(test) {
	checkOutput(test, "builtins/tupleText.pec");
};

exports.testUuidText = function(test) {
	checkOutput(test, "builtins/uuidText.pec");
};

