require("../../../../exploded");

var compareResourceOSO = require("../../parser/BaseParserTest").compareResourceOSO;

exports.testDateDayOfMonth = function(test) {
	compareResourceOSO(test, "builtins/dateDayOfMonth.poc");
};

exports.testDateDayOfYear = function(test) {
	compareResourceOSO(test, "builtins/dateDayOfYear.poc");
};

exports.testDateMonth = function(test) {
	compareResourceOSO(test, "builtins/dateMonth.poc");
};

exports.testDateTimeDayOfMonth = function(test) {
	compareResourceOSO(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testDateTimeDayOfYear = function(test) {
	compareResourceOSO(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testDateTimeHour = function(test) {
	compareResourceOSO(test, "builtins/dateTimeHour.poc");
};

exports.testDateTimeMinute = function(test) {
	compareResourceOSO(test, "builtins/dateTimeMinute.poc");
};

exports.testDateTimeMonth = function(test) {
	compareResourceOSO(test, "builtins/dateTimeMonth.poc");
};

exports.testDateTimeSecond = function(test) {
	compareResourceOSO(test, "builtins/dateTimeSecond.poc");
};

exports.testDateTimeTZName = function(test) {
	compareResourceOSO(test, "builtins/dateTimeTZName.poc");
};

exports.testDateTimeTZOffset = function(test) {
	compareResourceOSO(test, "builtins/dateTimeTZOffset.poc");
};

exports.testDateTimeYear = function(test) {
	compareResourceOSO(test, "builtins/dateTimeYear.poc");
};

exports.testDateYear = function(test) {
	compareResourceOSO(test, "builtins/dateYear.poc");
};

exports.testDictCount = function(test) {
	compareResourceOSO(test, "builtins/dictCount.poc");
};

exports.testEnumName = function(test) {
	compareResourceOSO(test, "builtins/enumName.poc");
};

exports.testEnumSymbols = function(test) {
	compareResourceOSO(test, "builtins/enumSymbols.poc");
};

exports.testEnumValue = function(test) {
	compareResourceOSO(test, "builtins/enumValue.poc");
};

exports.testListCount = function(test) {
	compareResourceOSO(test, "builtins/listCount.poc");
};

exports.testSetCount = function(test) {
	compareResourceOSO(test, "builtins/setCount.poc");
};

exports.testTextCount = function(test) {
	compareResourceOSO(test, "builtins/textCount.poc");
};

exports.testTimeHour = function(test) {
	compareResourceOSO(test, "builtins/timeHour.poc");
};

exports.testTimeMinute = function(test) {
	compareResourceOSO(test, "builtins/timeMinute.poc");
};

exports.testTimeSecond = function(test) {
	compareResourceOSO(test, "builtins/timeSecond.poc");
};

exports.testTupleCount = function(test) {
	compareResourceOSO(test, "builtins/tupleCount.poc");
};

