var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Minimal', () => {
	compareResourceEOE('widget/minimal.pec');
});

test('Native', () => {
	compareResourceEOE('widget/native.pec');
});

