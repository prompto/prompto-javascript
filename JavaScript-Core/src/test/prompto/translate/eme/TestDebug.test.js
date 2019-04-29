var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Stack', () => {
	compareResourceEME('debug/stack.pec');
});

test('Variable_boolean', () => {
	compareResourceEME('debug/variable-boolean.pec');
});

test('Variable_category', () => {
	compareResourceEME('debug/variable-category.pec');
});

test('Variable_character', () => {
	compareResourceEME('debug/variable-character.pec');
});

test('Variable_css', () => {
	compareResourceEME('debug/variable-css.pec');
});

test('Variable_cursor', () => {
	compareResourceEME('debug/variable-cursor.pec');
});

test('Variable_date', () => {
	compareResourceEME('debug/variable-date.pec');
});

test('Variable_dateTime', () => {
	compareResourceEME('debug/variable-dateTime.pec');
});

test('Variable_decimal', () => {
	compareResourceEME('debug/variable-decimal.pec');
});

test('Variable_dictionary', () => {
	compareResourceEME('debug/variable-dictionary.pec');
});

test('Variable_document', () => {
	compareResourceEME('debug/variable-document.pec');
});

test('Variable_integer', () => {
	compareResourceEME('debug/variable-integer.pec');
});

test('Variable_iterator', () => {
	compareResourceEME('debug/variable-iterator.pec');
});

test('Variable_list', () => {
	compareResourceEME('debug/variable-list.pec');
});

test('Variable_null', () => {
	compareResourceEME('debug/variable-null.pec');
});

test('Variable_range', () => {
	compareResourceEME('debug/variable-range.pec');
});

test('Variable_set', () => {
	compareResourceEME('debug/variable-set.pec');
});

test('Variable_text', () => {
	compareResourceEME('debug/variable-text.pec');
});

test('Variable_time', () => {
	compareResourceEME('debug/variable-time.pec');
});

test('Variable_tuple', () => {
	compareResourceEME('debug/variable-tuple.pec');
});

test('Variable_uuid', () => {
	compareResourceEME('debug/variable-uuid.pec');
});

test('Variable_version', () => {
	compareResourceEME('debug/variable-version.pec');
});

test('Variables', () => {
	compareResourceEME('debug/variables.pec');
});

