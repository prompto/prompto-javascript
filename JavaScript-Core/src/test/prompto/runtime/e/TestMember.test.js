var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MemberAttribute', () => {
	checkInterpretedOutput('member/memberAttribute.pec');
});

test('Transpiled MemberAttribute', () => {
	checkTranspiledOutput('member/memberAttribute.pec');
});

