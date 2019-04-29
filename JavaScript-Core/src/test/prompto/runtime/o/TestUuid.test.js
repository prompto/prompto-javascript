var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Uuid', () => {
	checkInterpretedOutput('uuid/uuid.poc');
});

test('Transpiled Uuid', () => {
	checkTranspiledOutput('uuid/uuid.poc');
});

