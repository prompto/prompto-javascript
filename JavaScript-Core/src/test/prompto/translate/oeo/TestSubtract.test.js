var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('SubDate', () => {
	compareResourceOEO('subtract/subDate.poc');
});

test('SubDateTime', () => {
	compareResourceOEO('subtract/subDateTime.poc');
});

test('SubDecimal', () => {
	compareResourceOEO('subtract/subDecimal.poc');
});

test('SubInteger', () => {
	compareResourceOEO('subtract/subInteger.poc');
});

test('SubList', () => {
	compareResourceOEO('subtract/subList.poc');
});

test('SubPeriod', () => {
	compareResourceOEO('subtract/subPeriod.poc');
});

test('SubSet', () => {
	compareResourceOEO('subtract/subSet.poc');
});

test('SubTime', () => {
	compareResourceOEO('subtract/subTime.poc');
});

