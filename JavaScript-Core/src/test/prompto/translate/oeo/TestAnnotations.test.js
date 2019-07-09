var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('WidgetField', () => {
	compareResourceOEO('annotations/WidgetField.poc');
});

test('Callback', () => {
	compareResourceOEO('annotations/callback.poc');
});

test('Category', () => {
	compareResourceOEO('annotations/category.poc');
});

