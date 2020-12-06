var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Attribute', () => {
	compareResourceOMO('singleton/attribute.poc');
});

test('Dictionary', () => {
	compareResourceOMO('singleton/dictionary.poc');
});

test('Initialize', () => {
	compareResourceOMO('singleton/initialize.poc');
});

test('Internal', () => {
	compareResourceOMO('singleton/internal.poc');
});

test('Member', () => {
	compareResourceOMO('singleton/member.poc');
});

