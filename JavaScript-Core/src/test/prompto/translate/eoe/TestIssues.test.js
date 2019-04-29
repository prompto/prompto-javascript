var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Minimal', () => {
	compareResourceEOE('issues/minimal.pec');
});

test('Widget', () => {
	compareResourceEOE('issues/widget.pec');
});

