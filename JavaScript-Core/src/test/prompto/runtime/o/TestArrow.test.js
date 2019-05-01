var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Sort1', () => {
	checkInterpretedOutput('arrow/sort1.poc');
});

test('Transpiled Sort1', () => {
	checkTranspiledOutput('arrow/sort1.poc');
});

test('Interpreted Sort1_desc', () => {
	checkInterpretedOutput('arrow/sort1_desc.poc');
});

test('Transpiled Sort1_desc', () => {
	checkTranspiledOutput('arrow/sort1_desc.poc');
});

test('Interpreted Sort2', () => {
	checkInterpretedOutput('arrow/sort2.poc');
});

test('Transpiled Sort2', () => {
	checkTranspiledOutput('arrow/sort2.poc');
});

test('Interpreted Sort2_desc', () => {
	checkInterpretedOutput('arrow/sort2_desc.poc');
});

test('Transpiled Sort2_desc', () => {
	checkTranspiledOutput('arrow/sort2_desc.poc');
});

