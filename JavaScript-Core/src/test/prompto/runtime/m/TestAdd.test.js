var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AddInteger', () => {
	checkInterpretedOutput('add/addInteger.pmc');
});

test('Transpiled AddInteger', () => {
	checkTranspiledOutput('add/addInteger.pmc');
});

