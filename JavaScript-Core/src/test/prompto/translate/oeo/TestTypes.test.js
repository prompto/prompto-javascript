var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Literal', () => {
	compareResourceOEO('types/literal.poc');
});

