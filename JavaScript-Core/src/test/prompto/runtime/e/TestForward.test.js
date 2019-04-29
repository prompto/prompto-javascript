var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Forward', () => {
	checkInterpretedOutput('forward/forward.pec');
});

test('Transpiled Forward', () => {
	checkTranspiledOutput('forward/forward.pec');
});

