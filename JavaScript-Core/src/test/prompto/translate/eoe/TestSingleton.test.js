var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Attribute', () => {
	compareResourceEOE('singleton/attribute.pec');
});

test('Constructor', () => {
	compareResourceEOE('singleton/constructor.pec');
});

test('Internal', () => {
	compareResourceEOE('singleton/internal.pec');
});

test('Member', () => {
	compareResourceEOE('singleton/member.pec');
});

