var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Getter', () => {
	compareResourceOEO('setters/getter.poc');
});

test('Setter', () => {
	compareResourceOEO('setters/setter.poc');
});

