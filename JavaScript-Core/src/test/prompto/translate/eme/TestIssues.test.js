var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Minimal', () => {
	compareResourceEME('issues/minimal.pec');
});

test('Widget', () => {
	compareResourceEME('issues/widget.pec');
});

