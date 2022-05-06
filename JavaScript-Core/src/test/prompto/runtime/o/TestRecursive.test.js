var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MutuallyRecursive', () => {
	checkInterpretedOutput('recursive/mutuallyRecursive.poc');
});

test('Transpiled MutuallyRecursive', () => {
	checkTranspiledOutput('recursive/mutuallyRecursive.poc');
});

test('Interpreted Recursive', () => {
	checkInterpretedOutput('recursive/recursive.poc');
});

test('Transpiled Recursive', () => {
	checkTranspiledOutput('recursive/recursive.poc');
});

