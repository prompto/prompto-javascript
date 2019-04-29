var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('BadRead', () => {
	compareResourceOMO('resourceError/badRead.poc');
});

test('BadResource', () => {
	compareResourceOMO('resourceError/badResource.poc');
});

test('BadWrite', () => {
	compareResourceOMO('resourceError/badWrite.poc');
});

