var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('SelfAsParameter', () => {
	compareResourceOMO('self/selfAsParameter.poc');
});

test('SelfMember', () => {
	compareResourceOMO('self/selfMember.poc');
});

