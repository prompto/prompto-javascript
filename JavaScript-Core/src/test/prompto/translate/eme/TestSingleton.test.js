var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Attribute', () => {
	compareResourceEME('singleton/attribute.pec');
});

test('Dictionary', () => {
	compareResourceEME('singleton/dictionary.pec');
});

test('Initialize', () => {
	compareResourceEME('singleton/initialize.pec');
});

test('Internal', () => {
	compareResourceEME('singleton/internal.pec');
});

test('Member', () => {
	compareResourceEME('singleton/member.pec');
});

