var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Uuid', () => {
	compareResourceOMO('uuid/uuid.poc');
});

