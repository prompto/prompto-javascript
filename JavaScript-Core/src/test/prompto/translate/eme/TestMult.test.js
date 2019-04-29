var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('MultCharacter', () => {
	compareResourceEME('mult/multCharacter.pec');
});

test('MultDecimal', () => {
	compareResourceEME('mult/multDecimal.pec');
});

test('MultInteger', () => {
	compareResourceEME('mult/multInteger.pec');
});

test('MultList', () => {
	compareResourceEME('mult/multList.pec');
});

test('MultPeriod', () => {
	compareResourceEME('mult/multPeriod.pec');
});

test('MultText', () => {
	compareResourceEME('mult/multText.pec');
});

