var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Literal', () => {
	checkInterpretedOutput('types/literal.poc');
});

test('Transpiled Literal', () => {
	checkTranspiledOutput('types/literal.poc');
});

