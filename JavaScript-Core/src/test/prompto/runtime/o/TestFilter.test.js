var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted FilterFromIterable', () => {
	checkInterpretedOutput('filter/filterFromIterable.poc');
});

test('Transpiled FilterFromIterable', () => {
	checkTranspiledOutput('filter/filterFromIterable.poc');
});

test('Interpreted FilterFromList', () => {
	checkInterpretedOutput('filter/filterFromList.poc');
});

test('Transpiled FilterFromList', () => {
	checkTranspiledOutput('filter/filterFromList.poc');
});

test('Interpreted FilterFromSet', () => {
	checkInterpretedOutput('filter/filterFromSet.poc');
});

test('Transpiled FilterFromSet', () => {
	checkTranspiledOutput('filter/filterFromSet.poc');
});

