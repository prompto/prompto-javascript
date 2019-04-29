var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('BadRead', () => {
	compareResourceEOE('resourceError/badRead.pec');
});

test('BadResource', () => {
	compareResourceEOE('resourceError/badResource.pec');
});

test('BadWrite', () => {
	compareResourceEOE('resourceError/badWrite.pec');
});

