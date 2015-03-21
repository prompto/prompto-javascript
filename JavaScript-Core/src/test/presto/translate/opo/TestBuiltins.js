require("../../../../exploded");

var compareResourceOPO = require("../../parser/BaseParserTest").compareResourceOPO;

exports.testDateDayOfMonth = function(test) {
	compareResourceOPO(test, "builtins/dateDayOfMonth.o");
};

exports.testDateDayOfYear = function(test) {
	compareResourceOPO(test, "builtins/dateDayOfYear.o");
};

exports.testDateMonth = function(test) {
	compareResourceOPO(test, "builtins/dateMonth.o");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceOPO(test, "builtins/dateTimeDayOfMonth.o");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceOPO(test, "builtins/dateTimeDayOfYear.o");
};

exports.testDateTimeHour = function(test) {
	compareResourceOPO(test, "builtins/dateTimeHour.o");
};

exports.testDateTimeMinute = function(test) {
	compareResourceOPO(test, "builtins/dateTimeMinute.o");
};

exports.testDateTimeMonth = function(test) {
	compareResourceOPO(test, "builtins/dateTimeMonth.o");
};

exports.testDateTimeSecond = function(test) {
	compareResourceOPO(test, "builtins/dateTimeSecond.o");
};

exports.testDateTimeTZName = function(test) {
	compareResourceOPO(test, "builtins/dateTimeTZName.o");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceOPO(test, "builtins/dateTimeTZOffset.o");
};

exports.testDateTimeYear = function(test) {
	compareResourceOPO(test, "builtins/dateTimeYear.o");
};

exports.testDateYear = function(test) {
	compareResourceOPO(test, "builtins/dateYear.o");
};

exports.testDictLength = function(test) {
	compareResourceOPO(test, "builtins/dictLength.o");
};

exports.testEnumName = function(test) {
	compareResourceOPO(test, "builtins/enumName.o");
};

exports.testEnumSymbols = function(test) {
	compareResourceOPO(test, "builtins/enumSymbols.o");
};

exports.testEnumValue = function(test) {
	compareResourceOPO(test, "builtins/enumValue.o");
};

exports.testListLength = function(test) {
	compareResourceOPO(test, "builtins/listLength.o");
};

exports.testSetLength = function(test) {
	compareResourceOPO(test, "builtins/setLength.o");
};

exports.testTextLength = function(test) {
	compareResourceOPO(test, "builtins/textLength.o");
};

exports.testTimeHour = function(test) {
	compareResourceOPO(test, "builtins/timeHour.o");
};

exports.testTimeMinute = function(test) {
	compareResourceOPO(test, "builtins/timeMinute.o");
};

exports.testTimeSecond = function(test) {
	compareResourceOPO(test, "builtins/timeSecond.o");
};

exports.testTupleLength = function(test) {
	compareResourceOPO(test, "builtins/tupleLength.o");
};

