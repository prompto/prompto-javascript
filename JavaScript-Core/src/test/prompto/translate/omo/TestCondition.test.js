var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ComplexIf', () => {
	compareResourceOMO('condition/complexIf.poc');
});

test('EmbeddedIf', () => {
	compareResourceOMO('condition/embeddedIf.poc');
});

test('ReturnIf', () => {
	compareResourceOMO('condition/returnIf.poc');
});

test('SimpleIf', () => {
	compareResourceOMO('condition/simpleIf.poc');
});

test('Switch', () => {
	compareResourceOMO('condition/switch.poc');
});

test('Ternary', () => {
	compareResourceOMO('condition/ternary.poc');
});

