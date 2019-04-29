require("../../../../exploded");

var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

exports.testStack = function(test) {
	compareResourceEOE(test, "debug/stack.pec");
};

exports.testVariable_boolean = function(test) {
	compareResourceEOE(test, "debug/variable-boolean.pec");
};

exports.testVariable_category = function(test) {
	compareResourceEOE(test, "debug/variable-category.pec");
};

exports.testVariable_character = function(test) {
	compareResourceEOE(test, "debug/variable-character.pec");
};

exports.testVariable_css = function(test) {
	compareResourceEOE(test, "debug/variable-css.pec");
};

exports.testVariable_cursor = function(test) {
	compareResourceEOE(test, "debug/variable-cursor.pec");
};

exports.testVariable_date = function(test) {
	compareResourceEOE(test, "debug/variable-date.pec");
};

exports.testVariable_dateTime = function(test) {
	compareResourceEOE(test, "debug/variable-dateTime.pec");
};

exports.testVariable_decimal = function(test) {
	compareResourceEOE(test, "debug/variable-decimal.pec");
};

exports.testVariable_dictionary = function(test) {
	compareResourceEOE(test, "debug/variable-dictionary.pec");
};

exports.testVariable_document = function(test) {
	compareResourceEOE(test, "debug/variable-document.pec");
};

exports.testVariable_integer = function(test) {
	compareResourceEOE(test, "debug/variable-integer.pec");
};

exports.testVariable_iterator = function(test) {
	compareResourceEOE(test, "debug/variable-iterator.pec");
};

exports.testVariable_list = function(test) {
	compareResourceEOE(test, "debug/variable-list.pec");
};

exports.testVariable_null = function(test) {
	compareResourceEOE(test, "debug/variable-null.pec");
};

exports.testVariable_range = function(test) {
	compareResourceEOE(test, "debug/variable-range.pec");
};

exports.testVariable_set = function(test) {
	compareResourceEOE(test, "debug/variable-set.pec");
};

exports.testVariable_text = function(test) {
	compareResourceEOE(test, "debug/variable-text.pec");
};

exports.testVariable_time = function(test) {
	compareResourceEOE(test, "debug/variable-time.pec");
};

exports.testVariable_tuple = function(test) {
	compareResourceEOE(test, "debug/variable-tuple.pec");
};

exports.testVariable_uuid = function(test) {
	compareResourceEOE(test, "debug/variable-uuid.pec");
};

exports.testVariable_version = function(test) {
	compareResourceEOE(test, "debug/variable-version.pec");
};

exports.testVariables = function(test) {
	compareResourceEOE(test, "debug/variables.pec");
};

