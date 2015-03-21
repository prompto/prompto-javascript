require("../../../../exploded");

var compareResourceEPE = require("../../parser/BaseParserTest").compareResourceEPE;

exports.testDateDayOfMonth = function(test) {
	compareResourceEPE(test, "builtins/dateDayOfMonth.e");
};

exports.testDateDayOfYear = function(test) {
	compareResourceEPE(test, "builtins/dateDayOfYear.e");
};

exports.testDateMonth = function(test) {
	compareResourceEPE(test, "builtins/dateMonth.e");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceEPE(test, "builtins/dateTimeDayOfMonth.e");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceEPE(test, "builtins/dateTimeDayOfYear.e");
};

exports.testDateTimeHour = function(test) {
	compareResourceEPE(test, "builtins/dateTimeHour.e");
};

exports.testDateTimeMinute = function(test) {
	compareResourceEPE(test, "builtins/dateTimeMinute.e");
};

exports.testDateTimeMonth = function(test) {
	compareResourceEPE(test, "builtins/dateTimeMonth.e");
};

exports.testDateTimeSecond = function(test) {
	compareResourceEPE(test, "builtins/dateTimeSecond.e");
};

exports.testDateTimeTZName = function(test) {
	compareResourceEPE(test, "builtins/dateTimeTZName.e");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceEPE(test, "builtins/dateTimeTZOffset.e");
};

exports.testDateTimeYear = function(test) {
	compareResourceEPE(test, "builtins/dateTimeYear.e");
};

exports.testDateYear = function(test) {
	compareResourceEPE(test, "builtins/dateYear.e");
};

exports.testDictLength = function(test) {
	compareResourceEPE(test, "builtins/dictLength.e");
};

exports.testEnumName = function(test) {
	compareResourceEPE(test, "builtins/enumName.e");
};

exports.testEnumSymbols = function(test) {
	compareResourceEPE(test, "builtins/enumSymbols.e");
};

exports.testEnumValue = function(test) {
	compareResourceEPE(test, "builtins/enumValue.e");
};

exports.testListLength = function(test) {
	compareResourceEPE(test, "builtins/listLength.e");
};

exports.testSetLength = function(test) {
	compareResourceEPE(test, "builtins/setLength.e");
};

exports.testTextLength = function(test) {
	compareResourceEPE(test, "builtins/textLength.e");
};

exports.testTimeHour = function(test) {
	compareResourceEPE(test, "builtins/timeHour.e");
};

exports.testTimeMinute = function(test) {
	compareResourceEPE(test, "builtins/timeMinute.e");
};

exports.testTimeSecond = function(test) {
	compareResourceEPE(test, "builtins/timeSecond.e");
};

exports.testTupleLength = function(test) {
	compareResourceEPE(test, "builtins/tupleLength.e");
};

