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

exports.testDateDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateDayOfMonth.e");
};

exports.testDateDayOfYear = function(test) {
	checkOutput(test, "builtins/dateDayOfYear.e");
};

exports.testDateMonth = function(test) {
	checkOutput(test, "builtins/dateMonth.e");
};

exports.testDateTimeDayOfMonth = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfMonth.e");
};

exports.testDateTimeDayOfYear = function(test) {
	checkOutput(test, "builtins/dateTimeDayOfYear.e");
};

exports.testDateTimeHour = function(test) {
	checkOutput(test, "builtins/dateTimeHour.e");
};

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.e");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.e");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.e");
};

exports.testDateTimeTZOffset = function(test) {
	checkOutput(test, "builtins/dateTimeTZOffset.e");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.e");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.e");
};

exports.testDictLength = function(test) {
	checkOutput(test, "builtins/dictLength.e");
};

exports.testEnumName = function(test) {
	checkOutput(test, "builtins/enumName.e");
};

exports.testEnumSymbols = function(test) {
	checkOutput(test, "builtins/enumSymbols.e");
};

exports.testEnumValue = function(test) {
	checkOutput(test, "builtins/enumValue.e");
};

exports.testListLength = function(test) {
	checkOutput(test, "builtins/listLength.e");
};

exports.testSetLength = function(test) {
	checkOutput(test, "builtins/setLength.e");
};

exports.testTextLength = function(test) {
	checkOutput(test, "builtins/textLength.e");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.e");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.e");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.e");
};

exports.testTupleLength = function(test) {
	checkOutput(test, "builtins/tupleLength.e");
};

