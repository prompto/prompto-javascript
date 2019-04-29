var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ExpressionInjection', () => {
	compareResourceOEO('injections/expressionInjection.poc');
});

