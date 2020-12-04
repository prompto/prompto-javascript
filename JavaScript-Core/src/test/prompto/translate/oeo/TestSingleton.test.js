var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Attribute', () => {
	compareResourceOEO('singleton/attribute.poc');
});

test('Constructor', () => {
	compareResourceOEO('singleton/constructor.poc');
});

test('Internal', () => {
	compareResourceOEO('singleton/internal.poc');
});

test('Member', () => {
	compareResourceOEO('singleton/member.poc');
});

