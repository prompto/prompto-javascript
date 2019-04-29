var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('DivDecimal', () => {
	compareResourceEOE('div/divDecimal.pec');
});

test('DivInteger', () => {
	compareResourceEOE('div/divInteger.pec');
});

test('IdivInteger', () => {
	compareResourceEOE('div/idivInteger.pec');
});

test('ModInteger', () => {
	compareResourceEOE('div/modInteger.pec');
});

