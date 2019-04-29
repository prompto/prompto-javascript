var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('MultCharacter', () => {
	compareResourceOEO('mult/multCharacter.poc');
});

test('MultDecimal', () => {
	compareResourceOEO('mult/multDecimal.poc');
});

test('MultInteger', () => {
	compareResourceOEO('mult/multInteger.poc');
});

test('MultList', () => {
	compareResourceOEO('mult/multList.poc');
});

test('MultPeriod', () => {
	compareResourceOEO('mult/multPeriod.poc');
});

test('MultText', () => {
	compareResourceOEO('mult/multText.poc');
});

