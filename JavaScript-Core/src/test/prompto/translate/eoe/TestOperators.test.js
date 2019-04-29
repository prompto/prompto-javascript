var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AddAmount', () => {
	compareResourceEOE('operators/addAmount.pec');
});

test('DivAmount', () => {
	compareResourceEOE('operators/divAmount.pec');
});

test('IdivAmount', () => {
	compareResourceEOE('operators/idivAmount.pec');
});

test('ModAmount', () => {
	compareResourceEOE('operators/modAmount.pec');
});

test('MultAmount', () => {
	compareResourceEOE('operators/multAmount.pec');
});

test('SubAmount', () => {
	compareResourceEOE('operators/subAmount.pec');
});

