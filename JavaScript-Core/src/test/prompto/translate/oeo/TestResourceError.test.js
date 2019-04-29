var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('BadRead', () => {
	compareResourceOEO('resourceError/badRead.poc');
});

test('BadResource', () => {
	compareResourceOEO('resourceError/badResource.poc');
});

test('BadWrite', () => {
	compareResourceOEO('resourceError/badWrite.poc');
});

