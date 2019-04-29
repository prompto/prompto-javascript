var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('MinusDecimal', () => {
	compareResourceEME('minus/minusDecimal.pec');
});

test('MinusInteger', () => {
	compareResourceEME('minus/minusInteger.pec');
});

test('MinusPeriod', () => {
	compareResourceEME('minus/minusPeriod.pec');
});

