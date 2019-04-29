var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
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

