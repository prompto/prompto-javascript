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
/*
exports.testCharCodePoint = function(test) {
	checkOutput(test, "builtins/charCodePoint.pec");
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

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.pec");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.pec");
};

exports.testDictCount = function(test) {
	checkOutput(test, "builtins/dictCount.pec");
};

exports.testDictKeys = function(test) {
	checkOutput(test, "builtins/dictKeys.pec");
};

exports.testDictValues = function(test) {
	checkOutput(test, "builtins/dictValues.pec");
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

exports.testListCount = function(test) {
	checkOutput(test, "builtins/listCount.pec");
};

exports.testSetCount = function(test) {
	checkOutput(test, "builtins/setCount.pec");
};
*/
exports.testTextCapitalize = function(test) {
	checkOutput(test, "builtins/textCapitalize.pec");
};

exports.testTextCount = function(test) {
	checkOutput(test, "builtins/textCount.pec");
};

exports.testTextLowercase = function(test) {
	checkOutput(test, "builtins/textLowercase.pec");
};

exports.testTextSplit = function(test) {
	checkOutput(test, "builtins/textSplit.pec");
};

exports.testTextUppercase = function(test) {
	checkOutput(test, "builtins/textUppercase.pec");
};
/*
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

exports.testTupleCount = function(test) {
	checkOutput(test, "builtins/tupleCount.pec");
};

*/