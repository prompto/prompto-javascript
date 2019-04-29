var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ItemDict', () => {
	checkInterpretedOutput('item/itemDict.poc');
});

test('Transpiled ItemDict', () => {
	checkTranspiledOutput('item/itemDict.poc');
});

test('Interpreted ItemList', () => {
	checkInterpretedOutput('item/itemList.poc');
});

test('Transpiled ItemList', () => {
	checkTranspiledOutput('item/itemList.poc');
});

test('Interpreted ItemRange', () => {
	checkInterpretedOutput('item/itemRange.poc');
});

test('Transpiled ItemRange', () => {
	checkTranspiledOutput('item/itemRange.poc');
});

test('Interpreted ItemSet', () => {
	checkInterpretedOutput('item/itemSet.poc');
});

test('Transpiled ItemSet', () => {
	checkTranspiledOutput('item/itemSet.poc');
});

test('Interpreted ItemText', () => {
	checkInterpretedOutput('item/itemText.poc');
});

test('Transpiled ItemText', () => {
	checkTranspiledOutput('item/itemText.poc');
});

