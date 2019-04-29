var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Getter', () => {
	compareResourceEOE('setters/getter.pec');
});

test('GetterCall', () => {
	compareResourceEOE('setters/getterCall.pec');
});

test('Setter', () => {
	compareResourceEOE('setters/setter.pec');
});

