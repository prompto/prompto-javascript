var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ComplexIf', () => {
	compareResourceOEO('condition/complexIf.poc');
});

test('EmbeddedIf', () => {
	compareResourceOEO('condition/embeddedIf.poc');
});

test('ReturnIf', () => {
	compareResourceOEO('condition/returnIf.poc');
});

test('SimpleIf', () => {
	compareResourceOEO('condition/simpleIf.poc');
});

test('Switch', () => {
	compareResourceOEO('condition/switch.poc');
});

test('Ternary', () => {
	compareResourceOEO('condition/ternary.poc');
});

