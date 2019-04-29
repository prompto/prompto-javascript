var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MemberAttribute', () => {
	checkInterpretedOutput('member/memberAttribute.poc');
});

test('Transpiled MemberAttribute', () => {
	checkTranspiledOutput('member/memberAttribute.poc');
});

