var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ComplexIf', () => {
	compareResourceEOE('condition/complexIf.pec');
});

test('EmbeddedIf', () => {
	compareResourceEOE('condition/embeddedIf.pec');
});

test('ReturnTextIf', () => {
	compareResourceEOE('condition/returnTextIf.pec');
});

test('ReturnVoidIf', () => {
	compareResourceEOE('condition/returnVoidIf.pec');
});

test('SimpleIf', () => {
	compareResourceEOE('condition/simpleIf.pec');
});

test('Switch', () => {
	compareResourceEOE('condition/switch.pec');
});

test('Ternary', () => {
	compareResourceEOE('condition/ternary.pec');
});

