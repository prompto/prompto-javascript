var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AndBoolean', () => {
	compareResourceOEO('logic/andBoolean.poc');
});

test('NotBoolean', () => {
	compareResourceOEO('logic/notBoolean.poc');
});

test('OrBoolean', () => {
	compareResourceOEO('logic/orBoolean.poc');
});

test('RightSkipped', () => {
	compareResourceOEO('logic/rightSkipped.poc');
});

