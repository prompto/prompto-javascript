var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Callback', () => {
	compareResourceEOE('annotations/callback.pec');
});

test('Category', () => {
	compareResourceEOE('annotations/category.pec');
});

