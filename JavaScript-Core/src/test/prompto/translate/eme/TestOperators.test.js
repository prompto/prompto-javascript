var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AddAmount', () => {
	compareResourceEME('operators/addAmount.pec');
});

test('DivAmount', () => {
	compareResourceEME('operators/divAmount.pec');
});

test('IdivAmount', () => {
	compareResourceEME('operators/idivAmount.pec');
});

test('ModAmount', () => {
	compareResourceEME('operators/modAmount.pec');
});

test('MultAmount', () => {
	compareResourceEME('operators/multAmount.pec');
});

test('SubAmount', () => {
	compareResourceEME('operators/subAmount.pec');
});

