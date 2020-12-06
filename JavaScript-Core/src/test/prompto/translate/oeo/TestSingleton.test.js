var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Attribute', () => {
	compareResourceOEO('singleton/attribute.poc');
});

test('Dictionary', () => {
	compareResourceOEO('singleton/dictionary.poc');
});

test('Initialize', () => {
	compareResourceOEO('singleton/initialize.poc');
});

test('Internal', () => {
	compareResourceOEO('singleton/internal.poc');
});

test('Member', () => {
	compareResourceOEO('singleton/member.poc');
});

