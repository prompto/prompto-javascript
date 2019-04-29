var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Uuid', () => {
	compareResourceEME('uuid/uuid.pec');
});

