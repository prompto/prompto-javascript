var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ItemDict', () => {
	checkInterpretedOutput('item/itemDict.pec');
});

test('Transpiled ItemDict', () => {
	checkTranspiledOutput('item/itemDict.pec');
});

test('Interpreted ItemList', () => {
	checkInterpretedOutput('item/itemList.pec');
});

test('Transpiled ItemList', () => {
	checkTranspiledOutput('item/itemList.pec');
});

test('Interpreted ItemRange', () => {
	checkInterpretedOutput('item/itemRange.pec');
});

test('Transpiled ItemRange', () => {
	checkTranspiledOutput('item/itemRange.pec');
});

test('Interpreted ItemSet', () => {
	checkInterpretedOutput('item/itemSet.pec');
});

test('Transpiled ItemSet', () => {
	checkTranspiledOutput('item/itemSet.pec');
});

test('Interpreted ItemText', () => {
	checkInterpretedOutput('item/itemText.pec');
});

test('Transpiled ItemText', () => {
	checkTranspiledOutput('item/itemText.pec');
});

