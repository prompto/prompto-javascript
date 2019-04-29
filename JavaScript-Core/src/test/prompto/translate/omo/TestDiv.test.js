var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('DivDecimal', () => {
	compareResourceOMO('div/divDecimal.poc');
});

test('DivInteger', () => {
	compareResourceOMO('div/divInteger.poc');
});

test('IdivInteger', () => {
	compareResourceOMO('div/idivInteger.poc');
});

test('ModInteger', () => {
	compareResourceOMO('div/modInteger.poc');
});

