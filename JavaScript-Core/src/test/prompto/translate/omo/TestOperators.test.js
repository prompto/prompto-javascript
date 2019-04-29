var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AddAmount', () => {
	compareResourceOMO('operators/addAmount.poc');
});

test('DivAmount', () => {
	compareResourceOMO('operators/divAmount.poc');
});

test('IdivAmount', () => {
	compareResourceOMO('operators/idivAmount.poc');
});

test('ModAmount', () => {
	compareResourceOMO('operators/modAmount.poc');
});

test('MultAmount', () => {
	compareResourceOMO('operators/multAmount.poc');
});

test('SubAmount', () => {
	compareResourceOMO('operators/subAmount.poc');
});

