var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Attribute', () => {
	compareResourceEME('singleton/attribute.pec');
});

test('Member', () => {
	compareResourceEME('singleton/member.pec');
});

