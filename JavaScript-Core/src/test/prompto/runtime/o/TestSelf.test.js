var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SelfAsParameter', () => {
	checkInterpretedOutput('self/selfAsParameter.poc');
});

test('Transpiled SelfAsParameter', () => {
	checkTranspiledOutput('self/selfAsParameter.poc');
});

test('Interpreted SelfMember', () => {
	checkInterpretedOutput('self/selfMember.poc');
});

test('Transpiled SelfMember', () => {
	checkTranspiledOutput('self/selfMember.poc');
});

