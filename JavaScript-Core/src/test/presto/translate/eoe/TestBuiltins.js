require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testDateDayOfMonth = function(test) {
	compareResourceEOE(test, "builtins/dateDayOfMonth.e");
};

exports.testDateDayOfYear = function(test) {
	compareResourceEOE(test, "builtins/dateDayOfYear.e");
};

exports.testDateMonth = function(test) {
	compareResourceEOE(test, "builtins/dateMonth.e");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceEOE(test, "builtins/dateTimeDayOfMonth.e");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceEOE(test, "builtins/dateTimeDayOfYear.e");
};

exports.testDateTimeHour = function(test) {
	compareResourceEOE(test, "builtins/dateTimeHour.e");
};

exports.testDateTimeMinute = function(test) {
	compareResourceEOE(test, "builtins/dateTimeMinute.e");
};

exports.testDateTimeMonth = function(test) {
	compareResourceEOE(test, "builtins/dateTimeMonth.e");
};

exports.testDateTimeSecond = function(test) {
	compareResourceEOE(test, "builtins/dateTimeSecond.e");
};

exports.testDateTimeTZName = function(test) {
	compareResourceEOE(test, "builtins/dateTimeTZName.e");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceEOE(test, "builtins/dateTimeTZOffset.e");
};

exports.testDateTimeYear = function(test) {
	compareResourceEOE(test, "builtins/dateTimeYear.e");
};

exports.testDateYear = function(test) {
	compareResourceEOE(test, "builtins/dateYear.e");
};

exports.testDictLength = function(test) {
	compareResourceEOE(test, "builtins/dictLength.e");
};

exports.testEnumName = function(test) {
	compareResourceEOE(test, "builtins/enumName.e");
};

exports.testEnumSymbols = function(test) {
	compareResourceEOE(test, "builtins/enumSymbols.e");
};

exports.testEnumValue = function(test) {
	compareResourceEOE(test, "builtins/enumValue.e");
};

exports.testListLength = function(test) {
	compareResourceEOE(test, "builtins/listLength.e");
};

exports.testSetLength = function(test) {
	compareResourceEOE(test, "builtins/setLength.e");
};

exports.testTextLength = function(test) {
	compareResourceEOE(test, "builtins/textLength.e");
};

exports.testTimeHour = function(test) {
	compareResourceEOE(test, "builtins/timeHour.e");
};

exports.testTimeMinute = function(test) {
	compareResourceEOE(test, "builtins/timeMinute.e");
};

exports.testTimeSecond = function(test) {
	compareResourceEOE(test, "builtins/timeSecond.e");
};

exports.testTupleLength = function(test) {
	compareResourceEOE(test, "builtins/tupleLength.e");
};

