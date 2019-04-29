var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('IntegerEnumeration', () => {
	compareResourceOEO('patterns/integerEnumeration.poc');
});

test('IntegerPattern', () => {
	compareResourceOEO('patterns/integerPattern.poc');
});

test('NegativeIntegerRange', () => {
	compareResourceOEO('patterns/negativeIntegerRange.poc');
});

test('PositiveIntegerRange', () => {
	compareResourceOEO('patterns/positiveIntegerRange.poc');
});

test('TextEnumeration', () => {
	compareResourceOEO('patterns/textEnumeration.poc');
});

test('TextPattern', () => {
	compareResourceOEO('patterns/textPattern.poc');
});

