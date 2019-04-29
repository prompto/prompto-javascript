var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Minimal', () => {
	compareResourceOMO('widget/minimal.poc');
});

test('Native', () => {
	compareResourceOMO('widget/native.poc');
});

test('WithEvent', () => {
	compareResourceOMO('widget/withEvent.poc');
});

