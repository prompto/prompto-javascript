var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ForEachExpression', () => {
	compareResourceOMO('iterate/forEachExpression.poc');
});

test('ForEachIntegerList', () => {
	compareResourceOMO('iterate/forEachIntegerList.poc');
});

test('ForEachIntegerRange', () => {
	compareResourceOMO('iterate/forEachIntegerRange.poc');
});

test('ForEachIntegerSet', () => {
	compareResourceOMO('iterate/forEachIntegerSet.poc');
});

