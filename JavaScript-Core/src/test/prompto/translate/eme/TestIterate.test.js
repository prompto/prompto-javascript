var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ForEachCategoryList', () => {
	compareResourceEME('iterate/forEachCategoryList.pec');
});

test('ForEachExpression', () => {
	compareResourceEME('iterate/forEachExpression.pec');
});

test('ForEachIntegerList', () => {
	compareResourceEME('iterate/forEachIntegerList.pec');
});

