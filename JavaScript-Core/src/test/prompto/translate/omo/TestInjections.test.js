var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ExpressionInjection', () => {
	compareResourceOMO('injections/expressionInjection.poc');
});

