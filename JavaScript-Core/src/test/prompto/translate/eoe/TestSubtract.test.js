var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('SubDate', () => {
	compareResourceEOE('subtract/subDate.pec');
});

test('SubDateTime', () => {
	compareResourceEOE('subtract/subDateTime.pec');
});

test('SubDecimal', () => {
	compareResourceEOE('subtract/subDecimal.pec');
});

test('SubDecimalEnum', () => {
	compareResourceEOE('subtract/subDecimalEnum.pec');
});

test('SubInteger', () => {
	compareResourceEOE('subtract/subInteger.pec');
});

test('SubIntegerEnum', () => {
	compareResourceEOE('subtract/subIntegerEnum.pec');
});

test('SubList', () => {
	compareResourceEOE('subtract/subList.pec');
});

test('SubPeriod', () => {
	compareResourceEOE('subtract/subPeriod.pec');
});

test('SubSet', () => {
	compareResourceEOE('subtract/subSet.pec');
});

test('SubTime', () => {
	compareResourceEOE('subtract/subTime.pec');
});

