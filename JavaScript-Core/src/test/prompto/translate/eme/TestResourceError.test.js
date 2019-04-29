var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('BadRead', () => {
	compareResourceEME('resourceError/badRead.pec');
});

test('BadResource', () => {
	compareResourceEME('resourceError/badResource.pec');
});

test('BadWrite', () => {
	compareResourceEME('resourceError/badWrite.pec');
});

