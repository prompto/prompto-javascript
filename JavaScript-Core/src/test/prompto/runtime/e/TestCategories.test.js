var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AnyAsParameter', () => {
	checkInterpretedOutput('categories/anyAsParameter.pec');
});

test('Transpiled AnyAsParameter', () => {
	checkTranspiledOutput('categories/anyAsParameter.pec');
});

test('Interpreted Composed', () => {
	checkInterpretedOutput('categories/composed.pec');
});

test('Transpiled Composed', () => {
	checkTranspiledOutput('categories/composed.pec');
});

test('Interpreted CopyFromAscendant', () => {
	checkInterpretedOutput('categories/copyFromAscendant.pec');
});

test('Transpiled CopyFromAscendant', () => {
	checkTranspiledOutput('categories/copyFromAscendant.pec');
});

test('Interpreted CopyFromAscendantWithOverride', () => {
	checkInterpretedOutput('categories/copyFromAscendantWithOverride.pec');
});

test('Transpiled CopyFromAscendantWithOverride', () => {
	checkTranspiledOutput('categories/copyFromAscendantWithOverride.pec');
});

test('Interpreted CopyFromDescendant', () => {
	checkInterpretedOutput('categories/copyFromDescendant.pec');
});

test('Transpiled CopyFromDescendant', () => {
	checkTranspiledOutput('categories/copyFromDescendant.pec');
});

test('Interpreted CopyFromDescendantWithOverride', () => {
	checkInterpretedOutput('categories/copyFromDescendantWithOverride.pec');
});

test('Transpiled CopyFromDescendantWithOverride', () => {
	checkTranspiledOutput('categories/copyFromDescendantWithOverride.pec');
});

test('Interpreted CopyFromDocument', () => {
	checkInterpretedOutput('categories/copyFromDocument.pec');
});

test('Transpiled CopyFromDocument', () => {
	checkTranspiledOutput('categories/copyFromDocument.pec');
});

test('Interpreted CopyFromStored', () => {
	checkInterpretedOutput('categories/copyFromStored.pec');
});

test('Transpiled CopyFromStored', () => {
	checkTranspiledOutput('categories/copyFromStored.pec');
});

