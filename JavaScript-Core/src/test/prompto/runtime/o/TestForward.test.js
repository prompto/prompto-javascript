var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Forward', () => {
	checkInterpretedOutput('forward/forward.poc');
});

test('Transpiled Forward', () => {
	checkTranspiledOutput('forward/forward.poc');
});

