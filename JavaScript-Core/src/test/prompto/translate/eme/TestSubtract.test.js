var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('SubDate', () => {
	compareResourceEME('subtract/subDate.pec');
});

test('SubDateTime', () => {
	compareResourceEME('subtract/subDateTime.pec');
});

test('SubDecimal', () => {
	compareResourceEME('subtract/subDecimal.pec');
});

test('SubDecimalEnum', () => {
	compareResourceEME('subtract/subDecimalEnum.pec');
});

test('SubInteger', () => {
	compareResourceEME('subtract/subInteger.pec');
});

test('SubIntegerEnum', () => {
	compareResourceEME('subtract/subIntegerEnum.pec');
});

test('SubList', () => {
	compareResourceEME('subtract/subList.pec');
});

test('SubPeriod', () => {
	compareResourceEME('subtract/subPeriod.pec');
});

test('SubSet', () => {
	compareResourceEME('subtract/subSet.pec');
});

test('SubTime', () => {
	compareResourceEME('subtract/subTime.pec');
});

