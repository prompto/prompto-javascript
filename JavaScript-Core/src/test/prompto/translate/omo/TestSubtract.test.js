var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('SubDate', () => {
	compareResourceOMO('subtract/subDate.poc');
});

test('SubDateTime', () => {
	compareResourceOMO('subtract/subDateTime.poc');
});

test('SubDecimal', () => {
	compareResourceOMO('subtract/subDecimal.poc');
});

test('SubInteger', () => {
	compareResourceOMO('subtract/subInteger.poc');
});

test('SubList', () => {
	compareResourceOMO('subtract/subList.poc');
});

test('SubPeriod', () => {
	compareResourceOMO('subtract/subPeriod.poc');
});

test('SubSet', () => {
	compareResourceOMO('subtract/subSet.poc');
});

test('SubTime', () => {
	compareResourceOMO('subtract/subTime.poc');
});

