var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Category', () => {
	checkInterpretedOutput('native/category.poc');
});

test('Transpiled Category', () => {
	checkTranspiledOutput('native/category.poc');
});

test('Interpreted CategoryReturn', () => {
	checkInterpretedOutput('native/categoryReturn.poc');
});

test('Transpiled CategoryReturn', () => {
	checkTranspiledOutput('native/categoryReturn.poc');
});

test('Interpreted Method', () => {
	checkInterpretedOutput('native/method.poc');
});

test('Transpiled Method', () => {
	checkTranspiledOutput('native/method.poc');
});

test('Interpreted ReturnBooleanLiteral', () => {
	checkInterpretedOutput('native/returnBooleanLiteral.poc');
});

test('Transpiled ReturnBooleanLiteral', () => {
	checkTranspiledOutput('native/returnBooleanLiteral.poc');
});

test('Interpreted ReturnBooleanObject', () => {
	checkInterpretedOutput('native/returnBooleanObject.poc');
});

test('Transpiled ReturnBooleanObject', () => {
	checkTranspiledOutput('native/returnBooleanObject.poc');
});

test('Interpreted ReturnBooleanValue', () => {
	checkInterpretedOutput('native/returnBooleanValue.poc');
});

test('Transpiled ReturnBooleanValue', () => {
	checkTranspiledOutput('native/returnBooleanValue.poc');
});

test('Interpreted ReturnCharacterLiteral', () => {
	checkInterpretedOutput('native/returnCharacterLiteral.poc');
});

test('Transpiled ReturnCharacterLiteral', () => {
	checkTranspiledOutput('native/returnCharacterLiteral.poc');
});

test('Interpreted ReturnCharacterObject', () => {
	checkInterpretedOutput('native/returnCharacterObject.poc');
});

test('Transpiled ReturnCharacterObject', () => {
	checkTranspiledOutput('native/returnCharacterObject.poc');
});

test('Interpreted ReturnCharacterValue', () => {
	checkInterpretedOutput('native/returnCharacterValue.poc');
});

test('Transpiled ReturnCharacterValue', () => {
	checkTranspiledOutput('native/returnCharacterValue.poc');
});

test('Interpreted ReturnDecimalLiteral', () => {
	checkInterpretedOutput('native/returnDecimalLiteral.poc');
});

test('Transpiled ReturnDecimalLiteral', () => {
	checkTranspiledOutput('native/returnDecimalLiteral.poc');
});

test('Interpreted ReturnIntegerLiteral', () => {
	checkInterpretedOutput('native/returnIntegerLiteral.poc');
});

test('Transpiled ReturnIntegerLiteral', () => {
	checkTranspiledOutput('native/returnIntegerLiteral.poc');
});

test('Interpreted ReturnIntegerObject', () => {
	checkInterpretedOutput('native/returnIntegerObject.poc');
});

test('Transpiled ReturnIntegerObject', () => {
	checkTranspiledOutput('native/returnIntegerObject.poc');
});

test('Interpreted ReturnIntegerValue', () => {
	checkInterpretedOutput('native/returnIntegerValue.poc');
});

test('Transpiled ReturnIntegerValue', () => {
	checkTranspiledOutput('native/returnIntegerValue.poc');
});

test('Interpreted ReturnLongLiteral', () => {
	checkInterpretedOutput('native/returnLongLiteral.poc');
});

test('Transpiled ReturnLongLiteral', () => {
	checkTranspiledOutput('native/returnLongLiteral.poc');
});

test('Interpreted ReturnLongObject', () => {
	checkInterpretedOutput('native/returnLongObject.poc');
});

test('Transpiled ReturnLongObject', () => {
	checkTranspiledOutput('native/returnLongObject.poc');
});

test('Interpreted ReturnLongValue', () => {
	checkInterpretedOutput('native/returnLongValue.poc');
});

test('Transpiled ReturnLongValue', () => {
	checkTranspiledOutput('native/returnLongValue.poc');
});

test('Interpreted ReturnNullValue', () => {
	checkInterpretedOutput('native/returnNullValue.poc');
});

test('Transpiled ReturnNullValue', () => {
	checkTranspiledOutput('native/returnNullValue.poc');
});

test('Interpreted ReturnStringLiteral', () => {
	checkInterpretedOutput('native/returnStringLiteral.poc');
});

test('Transpiled ReturnStringLiteral', () => {
	checkTranspiledOutput('native/returnStringLiteral.poc');
});

