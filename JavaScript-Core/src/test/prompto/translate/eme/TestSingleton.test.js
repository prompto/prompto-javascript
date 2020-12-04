var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Attribute', () => {
	compareResourceEME('singleton/attribute.pec');
});

test('Constructor', () => {
	compareResourceEME('singleton/constructor.pec');
});

test('Internal', () => {
	compareResourceEME('singleton/internal.pec');
});

test('Member', () => {
	compareResourceEME('singleton/member.pec');
});

