var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Callback', () => {
	compareResourceEME('annotations/callback.pec');
});

test('Category', () => {
	compareResourceEME('annotations/category.pec');
});

test('Inlined', () => {
	compareResourceEME('annotations/inlined.pec');
});

