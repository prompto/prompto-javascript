var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('IntegerEnumeration', () => {
	compareResourceEOE('patterns/integerEnumeration.pec');
});

test('IntegerPattern', () => {
	compareResourceEOE('patterns/integerPattern.pec');
});

test('NegativeIntegerRange', () => {
	compareResourceEOE('patterns/negativeIntegerRange.pec');
});

test('PositiveIntegerRange', () => {
	compareResourceEOE('patterns/positiveIntegerRange.pec');
});

test('TextEnumeration', () => {
	compareResourceEOE('patterns/textEnumeration.pec');
});

test('TextPattern', () => {
	compareResourceEOE('patterns/textPattern.pec');
});

