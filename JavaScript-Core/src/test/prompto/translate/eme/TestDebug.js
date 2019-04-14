require("../../../../exploded");

var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

exports.testStack = function(test) {
	compareResourceEME(test, "debug/stack.pec");
};

exports.testVariable_boolean = function(test) {
	compareResourceEME(test, "debug/variable-boolean.pec");
};

exports.testVariable_category = function(test) {
	compareResourceEME(test, "debug/variable-category.pec");
};

exports.testVariable_character = function(test) {
	compareResourceEME(test, "debug/variable-character.pec");
};

exports.testVariable_css = function(test) {
	compareResourceEME(test, "debug/variable-css.pec");
};

exports.testVariable_cursor = function(test) {
	compareResourceEME(test, "debug/variable-cursor.pec");
};

exports.testVariable_date = function(test) {
	compareResourceEME(test, "debug/variable-date.pec");
};

exports.testVariable_dateTime = function(test) {
	compareResourceEME(test, "debug/variable-dateTime.pec");
};

exports.testVariable_decimal = function(test) {
	compareResourceEME(test, "debug/variable-decimal.pec");
};

exports.testVariable_dictionary = function(test) {
	compareResourceEME(test, "debug/variable-dictionary.pec");
};

exports.testVariable_document = function(test) {
	compareResourceEME(test, "debug/variable-document.pec");
};

exports.testVariable_integer = function(test) {
	compareResourceEME(test, "debug/variable-integer.pec");
};

exports.testVariable_iterator = function(test) {
	compareResourceEME(test, "debug/variable-iterator.pec");
};

exports.testVariable_list = function(test) {
	compareResourceEME(test, "debug/variable-list.pec");
};

exports.testVariable_null = function(test) {
	compareResourceEME(test, "debug/variable-null.pec");
};

exports.testVariable_range = function(test) {
	compareResourceEME(test, "debug/variable-range.pec");
};

exports.testVariable_set = function(test) {
	compareResourceEME(test, "debug/variable-set.pec");
};

exports.testVariable_text = function(test) {
	compareResourceEME(test, "debug/variable-text.pec");
};

exports.testVariable_time = function(test) {
	compareResourceEME(test, "debug/variable-time.pec");
};

exports.testVariable_tuple = function(test) {
	compareResourceEME(test, "debug/variable-tuple.pec");
};

exports.testVariable_uuid = function(test) {
	compareResourceEME(test, "debug/variable-uuid.pec");
};

exports.testVariable_version = function(test) {
	compareResourceEME(test, "debug/variable-version.pec");
};

exports.testVariables = function(test) {
	compareResourceEME(test, "debug/variables.pec");
};

