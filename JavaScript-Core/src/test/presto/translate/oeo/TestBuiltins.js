require("../../../../exploded");

var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

exports.testDateDayOfMonth = function(test) {
	compareResourceOEO(test, "builtins/dateDayOfMonth.o");
};

exports.testDateDayOfYear = function(test) {
	compareResourceOEO(test, "builtins/dateDayOfYear.o");
};

exports.testDateMonth = function(test) {
	compareResourceOEO(test, "builtins/dateMonth.o");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceOEO(test, "builtins/dateTimeDayOfMonth.o");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceOEO(test, "builtins/dateTimeDayOfYear.o");
};

exports.testDateTimeHour = function(test) {
	compareResourceOEO(test, "builtins/dateTimeHour.o");
};

exports.testDateTimeMinute = function(test) {
	compareResourceOEO(test, "builtins/dateTimeMinute.o");
};

exports.testDateTimeMonth = function(test) {
	compareResourceOEO(test, "builtins/dateTimeMonth.o");
};

exports.testDateTimeSecond = function(test) {
	compareResourceOEO(test, "builtins/dateTimeSecond.o");
};

exports.testDateTimeTZName = function(test) {
	compareResourceOEO(test, "builtins/dateTimeTZName.o");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceOEO(test, "builtins/dateTimeTZOffset.o");
};

exports.testDateTimeYear = function(test) {
	compareResourceOEO(test, "builtins/dateTimeYear.o");
};

exports.testDateYear = function(test) {
	compareResourceOEO(test, "builtins/dateYear.o");
};

exports.testDictLength = function(test) {
	compareResourceOEO(test, "builtins/dictLength.o");
};

exports.testEnumName = function(test) {
	compareResourceOEO(test, "builtins/enumName.o");
};

exports.testEnumSymbols = function(test) {
	compareResourceOEO(test, "builtins/enumSymbols.o");
};

exports.testEnumValue = function(test) {
	compareResourceOEO(test, "builtins/enumValue.o");
};

exports.testListLength = function(test) {
	compareResourceOEO(test, "builtins/listLength.o");
};

exports.testSetLength = function(test) {
	compareResourceOEO(test, "builtins/setLength.o");
};

exports.testTextLength = function(test) {
	compareResourceOEO(test, "builtins/textLength.o");
};

exports.testTimeHour = function(test) {
	compareResourceOEO(test, "builtins/timeHour.o");
};

exports.testTimeMinute = function(test) {
	compareResourceOEO(test, "builtins/timeMinute.o");
};

exports.testTimeSecond = function(test) {
	compareResourceOEO(test, "builtins/timeSecond.o");
};

exports.testTupleLength = function(test) {
	compareResourceOEO(test, "builtins/tupleLength.o");
};

