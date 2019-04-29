var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('MultCharacter', () => {
	compareResourceEOE('mult/multCharacter.pec');
});

test('MultDecimal', () => {
	compareResourceEOE('mult/multDecimal.pec');
});

test('MultInteger', () => {
	compareResourceEOE('mult/multInteger.pec');
});

test('MultList', () => {
	compareResourceEOE('mult/multList.pec');
});

test('MultPeriod', () => {
	compareResourceEOE('mult/multPeriod.pec');
});

test('MultText', () => {
	compareResourceEOE('mult/multText.pec');
});

