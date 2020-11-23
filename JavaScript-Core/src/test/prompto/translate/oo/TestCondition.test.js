var compareResourceOO = require("../../parser/BaseParserTest").compareResourceOO;

test('EmbeddedIf', () => {
	compareResourceOO('condition/embeddedIf.poc');
});

