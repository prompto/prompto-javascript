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

exports.testDateTimeMinute = function(test) {
	checkOutput(test, "builtins/dateTimeMinute.pec");
};

exports.testDateTimeMonth = function(test) {
	checkOutput(test, "builtins/dateTimeMonth.pec");
};

exports.testDateTimeSecond = function(test) {
	checkOutput(test, "builtins/dateTimeSecond.pec");
};

exports.testDateTimeTZOffset = function(test) {
	checkOutput(test, "builtins/dateTimeTZOffset.pec");
};

exports.testDateTimeYear = function(test) {
	checkOutput(test, "builtins/dateTimeYear.pec");
};

exports.testDateYear = function(test) {
	checkOutput(test, "builtins/dateYear.pec");
};

exports.testDictLength = function(test) {
	checkOutput(test, "builtins/dictLength.pec");
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

exports.testListLength = function(test) {
	checkOutput(test, "builtins/listLength.pec");
};

exports.testSetLength = function(test) {
	checkOutput(test, "builtins/setLength.pec");
};

exports.testTextLength = function(test) {
	checkOutput(test, "builtins/textLength.pec");
};

exports.testTimeHour = function(test) {
	checkOutput(test, "builtins/timeHour.pec");
};

exports.testTimeMinute = function(test) {
	checkOutput(test, "builtins/timeMinute.pec");
};

exports.testTimeSecond = function(test) {
	checkOutput(test, "builtins/timeSecond.pec");
};

exports.testTupleLength = function(test) {
	checkOutput(test, "builtins/tupleLength.pec");
};

