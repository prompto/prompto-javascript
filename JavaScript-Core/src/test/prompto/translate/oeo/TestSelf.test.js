var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('SelfAsParameter', () => {
	compareResourceOEO('self/selfAsParameter.poc');
});

