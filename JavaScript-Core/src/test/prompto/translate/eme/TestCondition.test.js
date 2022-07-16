var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ComplexIf', () => {
	compareResourceEME('condition/complexIf.pec');
});

test('EmbeddedIf', () => {
	compareResourceEME('condition/embeddedIf.pec');
});

test('ReturnTextIf', () => {
	compareResourceEME('condition/returnTextIf.pec');
});

test('ReturnVoidIf', () => {
	compareResourceEME('condition/returnVoidIf.pec');
});

test('SimpleIf', () => {
	compareResourceEME('condition/simpleIf.pec');
});

test('Switch', () => {
	compareResourceEME('condition/switch.pec');
});

test('Ternary', () => {
	compareResourceEME('condition/ternary.pec');
});

