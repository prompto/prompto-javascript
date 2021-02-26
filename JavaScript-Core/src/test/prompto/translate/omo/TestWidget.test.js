var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Minimal', () => {
	compareResourceOMO('widget/minimal.poc');
});

test('Native', () => {
	compareResourceOMO('widget/native.poc');
});

test('WithDocumentLiteral', () => {
	compareResourceOMO('widget/withDocumentLiteral.poc');
});

test('WithEvent', () => {
	compareResourceOMO('widget/withEvent.poc');
});

