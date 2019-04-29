var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Minimal', () => {
	checkInterpretedOutput('widget/minimal.pmc');
});

test('Transpiled Minimal', () => {
	checkTranspiledOutput('widget/minimal.pmc');
});

test('Interpreted Native', () => {
	checkInterpretedOutput('widget/native.pmc');
});

test('Transpiled Native', () => {
	checkTranspiledOutput('widget/native.pmc');
});

