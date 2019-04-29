var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('DivDecimal', () => {
	compareResourceEME('div/divDecimal.pec');
});

test('DivInteger', () => {
	compareResourceEME('div/divInteger.pec');
});

test('IdivInteger', () => {
	compareResourceEME('div/idivInteger.pec');
});

test('ModInteger', () => {
	compareResourceEME('div/modInteger.pec');
});

