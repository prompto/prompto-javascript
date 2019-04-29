var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('IntegerEnumeration', () => {
	compareResourceOMO('patterns/integerEnumeration.poc');
});

test('IntegerPattern', () => {
	compareResourceOMO('patterns/integerPattern.poc');
});

test('NegativeIntegerRange', () => {
	compareResourceOMO('patterns/negativeIntegerRange.poc');
});

test('PositiveIntegerRange', () => {
	compareResourceOMO('patterns/positiveIntegerRange.poc');
});

test('TextEnumeration', () => {
	compareResourceOMO('patterns/textEnumeration.poc');
});

test('TextPattern', () => {
	compareResourceOMO('patterns/textPattern.poc');
});

