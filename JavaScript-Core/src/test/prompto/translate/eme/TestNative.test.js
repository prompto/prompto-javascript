var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AnyId', () => {
	compareResourceEME('native/anyId.pec');
});

test('AnyText', () => {
	compareResourceEME('native/anyText.pec');
});

test('Attribute', () => {
	compareResourceEME('native/attribute.pec');
});

test('Category', () => {
	compareResourceEME('native/category.pec');
});

test('CategoryReturn', () => {
	compareResourceEME('native/categoryReturn.pec');
});

test('Method', () => {
	compareResourceEME('native/method.pec');
});

test('Now', () => {
	compareResourceEME('native/now.pec');
});

test('Printer', () => {
	compareResourceEME('native/printer.pec');
});

test('Return', () => {
	compareResourceEME('native/return.pec');
});

