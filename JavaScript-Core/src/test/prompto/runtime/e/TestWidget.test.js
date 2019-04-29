var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Minimal', () => {
	checkInterpretedOutput('widget/minimal.pec');
});

test('Transpiled Minimal', () => {
	checkTranspiledOutput('widget/minimal.pec');
});

test('Interpreted Native', () => {
	checkInterpretedOutput('widget/native.pec');
});

test('Transpiled Native', () => {
	checkTranspiledOutput('widget/native.pec');
});

