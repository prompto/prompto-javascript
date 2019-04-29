var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ExpressionInjection', () => {
	compareResourceEME('injections/expressionInjection.pec');
});

