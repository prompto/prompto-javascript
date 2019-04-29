var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('MultCharacter', () => {
	compareResourceOMO('mult/multCharacter.poc');
});

test('MultDecimal', () => {
	compareResourceOMO('mult/multDecimal.poc');
});

test('MultInteger', () => {
	compareResourceOMO('mult/multInteger.poc');
});

test('MultList', () => {
	compareResourceOMO('mult/multList.poc');
});

test('MultPeriod', () => {
	compareResourceOMO('mult/multPeriod.poc');
});

test('MultText', () => {
	compareResourceOMO('mult/multText.poc');
});

