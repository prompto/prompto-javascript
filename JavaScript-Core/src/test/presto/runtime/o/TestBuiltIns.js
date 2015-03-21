require("../../../../exploded");

var Out = require("../utils/Out").Out;
var checkOutput = require("../../parser/BaseOParserTest").checkOutput;

exports.setUp = function(done) {
	Out.init();
	done();
};

exports.tearDown = function(done) {
	Out.restore();
	done();
};

exports.testDateDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateDayOfMonth.o");
};

exports.testDateDayOfYear = function(test) {
	checkOutput(test, "builtins/dateDayOfYear.o");
};

exports.testDateMonth = function(test) {
	checkOutput(test, "builtins/dateMonth.o");
};

exports.testDateTimeDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfMonth.o");
};

exports.testDateTimeDayOfYear = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfYear.o");
};

exports.testDateTimeHour = function(test) {
	checkOutput(test, "builtins/dateTimeHour.o");
};

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.o");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.o");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.o");
};

exports.testDateTimeTZOffset = function(test) {
	checkOutput(test, "builtins/dateTimeTZOffset.o");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.o");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.o");
};

exports.testDictLength = function(test) {
	checkOutput(test, "builtins/dictLength.o");
};

exports.testEnumName = function(test) {
	checkOutput(test, "builtins/enumName.o");
};

exports.testEnumSymbols = function(test) {
	checkOutput(test, "builtins/enumSymbols.o");
};

exports.testEnumValue = function(test) {
	checkOutput(test, "builtins/enumValue.o");
};

exports.testListLength = function(test) {
	checkOutput(test, "builtins/listLength.o");
};

exports.testSetLength = function(test) {
	checkOutput(test, "builtins/setLength.o");
};

exports.testTextLength = function(test) {
	checkOutput(test, "builtins/textLength.o");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.o");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.o");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.o");
};

exports.testTupleLength = function(test) {
	checkOutput(test, "builtins/tupleLength.o");
};

