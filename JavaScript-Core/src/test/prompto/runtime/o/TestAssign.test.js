var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DictEntry', () => {
	checkInterpretedOutput('assign/dictEntry.poc');
});

test('Transpiled DictEntry', () => {
	checkTranspiledOutput('assign/dictEntry.poc');
});

