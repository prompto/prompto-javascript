var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MemberAttribute', () => {
	checkInterpretedOutput('member/memberAttribute.pmc');
});

test('Transpiled MemberAttribute', () => {
	checkTranspiledOutput('member/memberAttribute.pmc');
});

