var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('IntegerEnumeration', () => {
	compareResourceEME('patterns/integerEnumeration.pec');
});

test('IntegerPattern', () => {
	compareResourceEME('patterns/integerPattern.pec');
});

test('NegativeIntegerRange', () => {
	compareResourceEME('patterns/negativeIntegerRange.pec');
});

test('PositiveIntegerRange', () => {
	compareResourceEME('patterns/positiveIntegerRange.pec');
});

test('TextEnumeration', () => {
	compareResourceEME('patterns/textEnumeration.pec');
});

test('TextPattern', () => {
	compareResourceEME('patterns/textPattern.pec');
});

