var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AttributeConstructor', () => {
	checkInterpretedOutput('categories/attributeConstructor.poc');
});

test('Transpiled AttributeConstructor', () => {
	checkTranspiledOutput('categories/attributeConstructor.poc');
});

test('Interpreted CopyFromAscendant', () => {
	checkInterpretedOutput('categories/copyFromAscendant.poc');
});

test('Transpiled CopyFromAscendant', () => {
	checkTranspiledOutput('categories/copyFromAscendant.poc');
});

test('Interpreted CopyFromAscendantWithOverride', () => {
	checkInterpretedOutput('categories/copyFromAscendantWithOverride.poc');
});

test('Transpiled CopyFromAscendantWithOverride', () => {
	checkTranspiledOutput('categories/copyFromAscendantWithOverride.poc');
});

test('Interpreted CopyFromDescendant', () => {
	checkInterpretedOutput('categories/copyFromDescendant.poc');
});

test('Transpiled CopyFromDescendant', () => {
	checkTranspiledOutput('categories/copyFromDescendant.poc');
});

test('Interpreted CopyFromDescendantWithOverride', () => {
	checkInterpretedOutput('categories/copyFromDescendantWithOverride.poc');
});

test('Transpiled CopyFromDescendantWithOverride', () => {
	checkTranspiledOutput('categories/copyFromDescendantWithOverride.poc');
});

test('Interpreted CopyFromDocument', () => {
	checkInterpretedOutput('categories/copyFromDocument.poc');
});

test('Transpiled CopyFromDocument', () => {
	checkTranspiledOutput('categories/copyFromDocument.poc');
});

test('Interpreted CopyFromStored', () => {
	checkInterpretedOutput('categories/copyFromStored.poc');
});

test('Transpiled CopyFromStored', () => {
	checkTranspiledOutput('categories/copyFromStored.poc');
});

test('Interpreted EmptyConstructor', () => {
	checkInterpretedOutput('categories/emptyConstructor.poc');
});

test('Transpiled EmptyConstructor', () => {
	checkTranspiledOutput('categories/emptyConstructor.poc');
});

test('Interpreted Equals', () => {
	checkInterpretedOutput('categories/equals.poc');
});

test('Transpiled Equals', () => {
	checkTranspiledOutput('categories/equals.poc');
});

test('Interpreted LiteralConstructor', () => {
	checkInterpretedOutput('categories/literalConstructor.poc');
});

test('Transpiled LiteralConstructor', () => {
	checkTranspiledOutput('categories/literalConstructor.poc');
});

test('Interpreted PopulateFalse', () => {
	checkInterpretedOutput('categories/populateFalse.poc');
});

test('Transpiled PopulateFalse', () => {
	checkTranspiledOutput('categories/populateFalse.poc');
});

test('Interpreted ResourceAttribute', () => {
	checkInterpretedOutput('categories/resourceAttribute.poc');
});

test('Transpiled ResourceAttribute', () => {
	checkTranspiledOutput('categories/resourceAttribute.poc');
});

test('Interpreted SynonymConstructor', () => {
	checkInterpretedOutput('categories/synonymConstructor.poc');
});

test('Transpiled SynonymConstructor', () => {
	checkTranspiledOutput('categories/synonymConstructor.poc');
});

test('Interpreted ValueConstructor', () => {
	checkInterpretedOutput('categories/valueConstructor.poc');
});

test('Transpiled ValueConstructor', () => {
	checkTranspiledOutput('categories/valueConstructor.poc');
});

