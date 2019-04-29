var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Category', () => {
	compareResourceOEO('native/category.poc');
});

test('CategoryReturn', () => {
	compareResourceOEO('native/categoryReturn.poc');
});

test('Method', () => {
	compareResourceOEO('native/method.poc');
});

test('Return', () => {
	compareResourceOEO('native/return.poc');
});

test('ReturnBooleanLiteral', () => {
	compareResourceOEO('native/returnBooleanLiteral.poc');
});

test('ReturnBooleanObject', () => {
	compareResourceOEO('native/returnBooleanObject.poc');
});

test('ReturnBooleanValue', () => {
	compareResourceOEO('native/returnBooleanValue.poc');
});

test('ReturnCharacterLiteral', () => {
	compareResourceOEO('native/returnCharacterLiteral.poc');
});

test('ReturnCharacterObject', () => {
	compareResourceOEO('native/returnCharacterObject.poc');
});

test('ReturnCharacterValue', () => {
	compareResourceOEO('native/returnCharacterValue.poc');
});

test('ReturnDecimalLiteral', () => {
	compareResourceOEO('native/returnDecimalLiteral.poc');
});

test('ReturnIntegerLiteral', () => {
	compareResourceOEO('native/returnIntegerLiteral.poc');
});

test('ReturnIntegerObject', () => {
	compareResourceOEO('native/returnIntegerObject.poc');
});

test('ReturnIntegerValue', () => {
	compareResourceOEO('native/returnIntegerValue.poc');
});

test('ReturnLongLiteral', () => {
	compareResourceOEO('native/returnLongLiteral.poc');
});

test('ReturnLongObject', () => {
	compareResourceOEO('native/returnLongObject.poc');
});

test('ReturnLongValue', () => {
	compareResourceOEO('native/returnLongValue.poc');
});

test('ReturnStringLiteral', () => {
	compareResourceOEO('native/returnStringLiteral.poc');
});

