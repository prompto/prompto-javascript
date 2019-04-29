var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('MinusDecimal', () => {
	compareResourceOEO('minus/minusDecimal.poc');
});

test('MinusInteger', () => {
	compareResourceOEO('minus/minusInteger.poc');
});

test('MinusPeriod', () => {
	compareResourceOEO('minus/minusPeriod.poc');
});

