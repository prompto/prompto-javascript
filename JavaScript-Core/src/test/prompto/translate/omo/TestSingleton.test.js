var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Attribute', () => {
	compareResourceOMO('singleton/attribute.poc');
});

test('Member', () => {
	compareResourceOMO('singleton/member.poc');
});

