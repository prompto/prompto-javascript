var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AndBoolean', () => {
	compareResourceOMO('logic/andBoolean.poc');
});

test('NotBoolean', () => {
	compareResourceOMO('logic/notBoolean.poc');
});

test('OrBoolean', () => {
	compareResourceOMO('logic/orBoolean.poc');
});

test('RightSkipped', () => {
	compareResourceOMO('logic/rightSkipped.poc');
});

