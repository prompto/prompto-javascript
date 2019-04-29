var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ComplexIf', () => {
	compareResourceEME('condition/complexIf.pec');
});

test('EmbeddedIf', () => {
	compareResourceEME('condition/embeddedIf.pec');
});

test('ReturnIf', () => {
	compareResourceEME('condition/returnIf.pec');
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

