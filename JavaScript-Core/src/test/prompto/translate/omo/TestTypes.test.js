var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Literal', () => {
	compareResourceOMO('types/literal.poc');
});

