var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('DivDecimal', () => {
	compareResourceOEO('div/divDecimal.poc');
});

test('DivInteger', () => {
	compareResourceOEO('div/divInteger.poc');
});

test('IdivInteger', () => {
	compareResourceOEO('div/idivInteger.poc');
});

test('ModInteger', () => {
	compareResourceOEO('div/modInteger.poc');
});

