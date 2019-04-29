var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Stack', () => {
	compareResourceEOE('debug/stack.pec');
});

test('Variable_boolean', () => {
	compareResourceEOE('debug/variable-boolean.pec');
});

test('Variable_category', () => {
	compareResourceEOE('debug/variable-category.pec');
});

test('Variable_character', () => {
	compareResourceEOE('debug/variable-character.pec');
});

test('Variable_css', () => {
	compareResourceEOE('debug/variable-css.pec');
});

test('Variable_cursor', () => {
	compareResourceEOE('debug/variable-cursor.pec');
});

test('Variable_date', () => {
	compareResourceEOE('debug/variable-date.pec');
});

test('Variable_dateTime', () => {
	compareResourceEOE('debug/variable-dateTime.pec');
});

test('Variable_decimal', () => {
	compareResourceEOE('debug/variable-decimal.pec');
});

test('Variable_dictionary', () => {
	compareResourceEOE('debug/variable-dictionary.pec');
});

test('Variable_document', () => {
	compareResourceEOE('debug/variable-document.pec');
});

test('Variable_integer', () => {
	compareResourceEOE('debug/variable-integer.pec');
});

test('Variable_iterator', () => {
	compareResourceEOE('debug/variable-iterator.pec');
});

test('Variable_list', () => {
	compareResourceEOE('debug/variable-list.pec');
});

test('Variable_null', () => {
	compareResourceEOE('debug/variable-null.pec');
});

test('Variable_range', () => {
	compareResourceEOE('debug/variable-range.pec');
});

test('Variable_set', () => {
	compareResourceEOE('debug/variable-set.pec');
});

test('Variable_text', () => {
	compareResourceEOE('debug/variable-text.pec');
});

test('Variable_time', () => {
	compareResourceEOE('debug/variable-time.pec');
});

test('Variable_tuple', () => {
	compareResourceEOE('debug/variable-tuple.pec');
});

test('Variable_uuid', () => {
	compareResourceEOE('debug/variable-uuid.pec');
});

test('Variable_version', () => {
	compareResourceEOE('debug/variable-version.pec');
});

test('Variables', () => {
	compareResourceEOE('debug/variables.pec');
});

