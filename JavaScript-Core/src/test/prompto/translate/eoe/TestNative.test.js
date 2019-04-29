var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AnyId', () => {
	compareResourceEOE('native/anyId.pec');
});

test('AnyText', () => {
	compareResourceEOE('native/anyText.pec');
});

test('Attribute', () => {
	compareResourceEOE('native/attribute.pec');
});

test('Category', () => {
	compareResourceEOE('native/category.pec');
});

test('CategoryReturn', () => {
	compareResourceEOE('native/categoryReturn.pec');
});

test('Method', () => {
	compareResourceEOE('native/method.pec');
});

test('Now', () => {
	compareResourceEOE('native/now.pec');
});

test('Printer', () => {
	compareResourceEOE('native/printer.pec');
});

test('Return', () => {
	compareResourceEOE('native/return.pec');
});

