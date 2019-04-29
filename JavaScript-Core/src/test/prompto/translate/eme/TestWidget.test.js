var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Minimal', () => {
	compareResourceEME('widget/minimal.pec');
});

test('Native', () => {
	compareResourceEME('widget/native.pec');
});

