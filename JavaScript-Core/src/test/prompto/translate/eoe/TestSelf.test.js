var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('SelfAsParameter', () => {
	compareResourceEOE('self/selfAsParameter.pec');
});

test('SelfMember', () => {
	compareResourceEOE('self/selfMember.pec');
});

