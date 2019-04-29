var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted InferDict', () => {
	checkInterpretedOutput('infer/inferDict.pec');
});

test('Transpiled InferDict', () => {
	checkTranspiledOutput('infer/inferDict.pec');
});

test('Interpreted InferList', () => {
	checkInterpretedOutput('infer/inferList.pec');
});

test('Transpiled InferList', () => {
	checkTranspiledOutput('infer/inferList.pec');
});

test('Interpreted InferSet', () => {
	checkInterpretedOutput('infer/inferSet.pec');
});

test('Transpiled InferSet', () => {
	checkTranspiledOutput('infer/inferSet.pec');
});

