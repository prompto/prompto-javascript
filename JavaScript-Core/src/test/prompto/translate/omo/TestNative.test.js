var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Category', () => {
	compareResourceOMO('native/category.poc');
});

test('CategoryReturn', () => {
	compareResourceOMO('native/categoryReturn.poc');
});

test('Method', () => {
	compareResourceOMO('native/method.poc');
});

test('Return', () => {
	compareResourceOMO('native/return.poc');
});

test('ReturnBooleanLiteral', () => {
	compareResourceOMO('native/returnBooleanLiteral.poc');
});

test('ReturnBooleanObject', () => {
	compareResourceOMO('native/returnBooleanObject.poc');
});

test('ReturnBooleanValue', () => {
	compareResourceOMO('native/returnBooleanValue.poc');
});

test('ReturnCharacterLiteral', () => {
	compareResourceOMO('native/returnCharacterLiteral.poc');
});

test('ReturnCharacterObject', () => {
	compareResourceOMO('native/returnCharacterObject.poc');
});

test('ReturnCharacterValue', () => {
	compareResourceOMO('native/returnCharacterValue.poc');
});

test('ReturnDecimalLiteral', () => {
	compareResourceOMO('native/returnDecimalLiteral.poc');
});

test('ReturnIntegerLiteral', () => {
	compareResourceOMO('native/returnIntegerLiteral.poc');
});

test('ReturnIntegerObject', () => {
	compareResourceOMO('native/returnIntegerObject.poc');
});

test('ReturnIntegerValue', () => {
	compareResourceOMO('native/returnIntegerValue.poc');
});

test('ReturnLongLiteral', () => {
	compareResourceOMO('native/returnLongLiteral.poc');
});

test('ReturnLongObject', () => {
	compareResourceOMO('native/returnLongObject.poc');
});

test('ReturnLongValue', () => {
	compareResourceOMO('native/returnLongValue.poc');
});

test('ReturnNullValue', () => {
	compareResourceOMO('native/returnNullValue.poc');
});

test('ReturnStringLiteral', () => {
	compareResourceOMO('native/returnStringLiteral.poc');
});

