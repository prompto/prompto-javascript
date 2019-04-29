var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ForEachCategoryList', () => {
	compareResourceEOE('iterate/forEachCategoryList.pec');
});

test('ForEachExpression', () => {
	compareResourceEOE('iterate/forEachExpression.pec');
});

test('ForEachIntegerList', () => {
	compareResourceEOE('iterate/forEachIntegerList.pec');
});

