var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('MinusDecimal', () => {
	compareResourceOMO('minus/minusDecimal.poc');
});

test('MinusInteger', () => {
	compareResourceOMO('minus/minusInteger.poc');
});

test('MinusPeriod', () => {
	compareResourceOMO('minus/minusPeriod.poc');
});

