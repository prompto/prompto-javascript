var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Callback', () => {
	compareResourceOMO('annotations/callback.poc');
});

test('Category', () => {
	compareResourceOMO('annotations/category.poc');
});

