var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Getter', () => {
	compareResourceOMO('setters/getter.poc');
});

test('Setter', () => {
	compareResourceOMO('setters/setter.poc');
});

