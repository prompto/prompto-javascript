var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AddAmount', () => {
	compareResourceOEO('operators/addAmount.poc');
});

test('DivAmount', () => {
	compareResourceOEO('operators/divAmount.poc');
});

test('IdivAmount', () => {
	compareResourceOEO('operators/idivAmount.poc');
});

test('ModAmount', () => {
	compareResourceOEO('operators/modAmount.poc');
});

test('MultAmount', () => {
	compareResourceOEO('operators/multAmount.poc');
});

test('SubAmount', () => {
	compareResourceOEO('operators/subAmount.poc');
});

