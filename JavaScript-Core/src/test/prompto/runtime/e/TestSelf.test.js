var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SelfAsParameter', () => {
	checkInterpretedOutput('self/selfAsParameter.pec');
});

test('Transpiled SelfAsParameter', () => {
	checkTranspiledOutput('self/selfAsParameter.pec');
});

test('Interpreted SelfMember', () => {
	checkInterpretedOutput('self/selfMember.pec');
});

test('Transpiled SelfMember', () => {
	checkTranspiledOutput('self/selfMember.pec');
});

