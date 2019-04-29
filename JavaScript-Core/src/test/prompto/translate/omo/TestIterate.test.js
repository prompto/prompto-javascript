var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ForEachExpression', () => {
	compareResourceOMO('iterate/forEachExpression.poc');
});

test('ForEachIntegerList', () => {
	compareResourceOMO('iterate/forEachIntegerList.poc');
});

