var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('MinusDecimal', () => {
	compareResourceEOE('minus/minusDecimal.pec');
});

test('MinusInteger', () => {
	compareResourceEOE('minus/minusInteger.pec');
});

test('MinusPeriod', () => {
	compareResourceEOE('minus/minusPeriod.pec');
});

