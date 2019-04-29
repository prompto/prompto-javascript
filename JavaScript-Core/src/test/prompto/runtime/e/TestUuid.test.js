var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Uuid', () => {
	checkInterpretedOutput('uuid/uuid.pec');
});

test('Transpiled Uuid', () => {
	checkTranspiledOutput('uuid/uuid.pec');
});

