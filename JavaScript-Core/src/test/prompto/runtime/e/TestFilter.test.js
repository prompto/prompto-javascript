var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted FilterFromCursor', () => {
	checkInterpretedOutput('filter/filterFromCursor.pec');
});

test('Transpiled FilterFromCursor', () => {
	checkTranspiledOutput('filter/filterFromCursor.pec');
});

test('Interpreted FilterFromList', () => {
	checkInterpretedOutput('filter/filterFromList.pec');
});

test('Transpiled FilterFromList', () => {
	checkTranspiledOutput('filter/filterFromList.pec');
});

test('Interpreted FilterFromSet', () => {
	checkInterpretedOutput('filter/filterFromSet.pec');
});

test('Transpiled FilterFromSet', () => {
	checkTranspiledOutput('filter/filterFromSet.pec');
});

