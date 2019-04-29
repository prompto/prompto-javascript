var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Getter', () => {
	compareResourceEME('setters/getter.pec');
});

test('GetterCall', () => {
	compareResourceEME('setters/getterCall.pec');
});

test('Setter', () => {
	compareResourceEME('setters/setter.pec');
});

