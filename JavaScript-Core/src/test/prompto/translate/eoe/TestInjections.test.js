var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ExpressionInjection', () => {
	compareResourceEOE('injections/expressionInjection.pec');
});

