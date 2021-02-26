var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Minimal', () => {
	compareResourceOEO('widget/minimal.poc');
});

test('Native', () => {
	compareResourceOEO('widget/native.poc');
});

test('WithDocumentLiteral', () => {
	compareResourceOEO('widget/withDocumentLiteral.poc');
});

test('WithEvent', () => {
	compareResourceOEO('widget/withEvent.poc');
});

