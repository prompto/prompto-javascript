var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('WidgetField', () => {
	compareResourceOMO('annotations/WidgetField.poc');
});

test('Callback', () => {
	compareResourceOMO('annotations/callback.poc');
});

test('Category', () => {
	compareResourceOMO('annotations/category.poc');
});

