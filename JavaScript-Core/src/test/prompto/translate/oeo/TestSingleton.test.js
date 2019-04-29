var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Attribute', () => {
	compareResourceOEO('singleton/attribute.poc');
});

test('Member', () => {
	compareResourceOEO('singleton/member.poc');
});

