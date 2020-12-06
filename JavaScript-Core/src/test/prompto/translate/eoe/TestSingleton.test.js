var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Attribute', () => {
	compareResourceEOE('singleton/attribute.pec');
});

test('Dictionary', () => {
	compareResourceEOE('singleton/dictionary.pec');
});

test('Initialize', () => {
	compareResourceEOE('singleton/initialize.pec');
});

test('Internal', () => {
	compareResourceEOE('singleton/internal.pec');
});

test('Member', () => {
	compareResourceEOE('singleton/member.pec');
});

