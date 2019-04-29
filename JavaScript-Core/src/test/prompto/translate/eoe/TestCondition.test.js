var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ComplexIf', () => {
	compareResourceEOE('condition/complexIf.pec');
});

test('EmbeddedIf', () => {
	compareResourceEOE('condition/embeddedIf.pec');
});

test('ReturnIf', () => {
	compareResourceEOE('condition/returnIf.pec');
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

