// generated: 2015-07-05T23:01:01.994
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
	checkOutput(test, "builtins/dateDayOfMonth.poc");
};

exports.testDateDayOfYear = function(test) {
	checkOutput(test, "builtins/dateDayOfYear.poc");
};

exports.testDateMonth = function(test) {
	checkOutput(test, "builtins/dateMonth.poc");
};

exports.testDateTimeDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfMonth.poc");
};

exports.testDateTimeDayOfYear = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfYear.poc");
};

exports.testDateTimeHour = function(test) {
	checkOutput(test, "builtins/dateTimeHour.poc");
};

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.poc");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.poc");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.poc");
};

exports.testDateTimeTZOffset = function(test) {
	checkOutput(test, "builtins/dateTimeTZOffset.poc");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.poc");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.poc");
};

exports.testDictLength = function(test) {
	checkOutput(test, "builtins/dictLength.poc");
};

exports.testEnumName = function(test) {
	checkOutput(test, "builtins/enumName.poc");
};

exports.testEnumSymbols = function(test) {
	checkOutput(test, "builtins/enumSymbols.poc");
};

exports.testEnumValue = function(test) {
	checkOutput(test, "builtins/enumValue.poc");
};

exports.testListLength = function(test) {
	checkOutput(test, "builtins/listLength.poc");
};

exports.testSetLength = function(test) {
	checkOutput(test, "builtins/setLength.poc");
};

exports.testTextLength = function(test) {
	checkOutput(test, "builtins/textLength.poc");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.poc");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.poc");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.poc");
};

exports.testTupleLength = function(test) {
	checkOutput(test, "builtins/tupleLength.poc");
};

