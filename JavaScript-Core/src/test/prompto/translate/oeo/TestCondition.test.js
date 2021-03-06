var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ComplexIf', () => {
	compareResourceOEO('condition/complexIf.poc');
});

test('EmbeddedIf', () => {
	compareResourceOEO('condition/embeddedIf.poc');
});

test('LocalScope', () => {
	compareResourceOEO('condition/localScope.poc');
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

test('TernaryType', () => {
	compareResourceOEO('condition/ternaryType.poc');
});

