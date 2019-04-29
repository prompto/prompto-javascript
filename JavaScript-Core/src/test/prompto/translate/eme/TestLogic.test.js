var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AndBoolean', () => {
	compareResourceEME('logic/andBoolean.pec');
});

test('NotBoolean', () => {
	compareResourceEME('logic/notBoolean.pec');
});

test('OrBoolean', () => {
	compareResourceEME('logic/orBoolean.pec');
});

