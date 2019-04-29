var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Callback', () => {
	compareResourceOEO('annotations/callback.poc');
});

test('Category', () => {
	compareResourceOEO('annotations/category.poc');
});

