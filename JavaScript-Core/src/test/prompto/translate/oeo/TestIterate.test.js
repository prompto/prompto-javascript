var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ForEachExpression', () => {
	compareResourceOEO('iterate/forEachExpression.poc');
});

test('ForEachIntegerList', () => {
	compareResourceOEO('iterate/forEachIntegerList.poc');
});

test('ForEachIntegerRange', () => {
	compareResourceOEO('iterate/forEachIntegerRange.poc');
});

test('ForEachIntegerSet', () => {
	compareResourceOEO('iterate/forEachIntegerSet.poc');
});

