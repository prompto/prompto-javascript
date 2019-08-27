var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ReactWidgetProps1', () => {
	compareResourceOEO('annotations/ReactWidgetProps1.poc');
});

test('ReactWidgetProps2', () => {
	compareResourceOEO('annotations/ReactWidgetProps2.poc');
});

test('WidgetField', () => {
	compareResourceOEO('annotations/WidgetField.poc');
});

test('WidgetProps1', () => {
	compareResourceOEO('annotations/WidgetProps1.poc');
});

test('WidgetProps2', () => {
	compareResourceOEO('annotations/WidgetProps2.poc');
});

test('Callback', () => {
	compareResourceOEO('annotations/callback.poc');
});

test('Category', () => {
	compareResourceOEO('annotations/category.poc');
});

