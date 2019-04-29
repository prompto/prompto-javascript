var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Uuid', () => {
	compareResourceOEO('uuid/uuid.poc');
});

