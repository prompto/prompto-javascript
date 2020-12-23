var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted HasAllFromList', () => {
	checkInterpretedOutput('arrow/hasAllFromList.pec');
});

test('Transpiled HasAllFromList', () => {
	checkTranspiledOutput('arrow/hasAllFromList.pec');
});

test('Interpreted HasAllFromSet', () => {
	checkInterpretedOutput('arrow/hasAllFromSet.pec');
});

test('Transpiled HasAllFromSet', () => {
	checkTranspiledOutput('arrow/hasAllFromSet.pec');
});

test('Interpreted HasAnyFromList', () => {
	checkInterpretedOutput('arrow/hasAnyFromList.pec');
});

test('Transpiled HasAnyFromList', () => {
	checkTranspiledOutput('arrow/hasAnyFromList.pec');
});

test('Interpreted HasAnyFromSet', () => {
	checkInterpretedOutput('arrow/hasAnyFromSet.pec');
});

test('Transpiled HasAnyFromSet', () => {
	checkTranspiledOutput('arrow/hasAnyFromSet.pec');
});

