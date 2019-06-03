var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AndBoolean', () => {
	compareResourceEOE('logic/andBoolean.pec');
});

test('NotBoolean', () => {
	compareResourceEOE('logic/notBoolean.pec');
});

test('OrBoolean', () => {
	compareResourceEOE('logic/orBoolean.pec');
});

test('RightSkipped', () => {
	compareResourceEOE('logic/rightSkipped.pec');
});

