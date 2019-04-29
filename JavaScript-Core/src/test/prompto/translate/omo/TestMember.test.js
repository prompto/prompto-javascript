var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('MemberAttribute', () => {
	compareResourceOMO('member/memberAttribute.poc');
});

