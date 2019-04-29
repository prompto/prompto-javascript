var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Callback', () => {
	compareResourceEME('annotations/callback.pec');
});

test('Category', () => {
	compareResourceEME('annotations/category.pec');
});

