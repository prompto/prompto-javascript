var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('SelfAsParameter', () => {
	compareResourceOEO('self/selfAsParameter.poc');
});

test('SelfMember', () => {
	compareResourceOEO('self/selfMember.poc');
});

