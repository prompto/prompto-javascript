var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('And', () => {
	compareResourceEME('testing/and.pec');
});

test('Contains', () => {
	compareResourceEME('testing/contains.pec');
});

test('Greater', () => {
	compareResourceEME('testing/greater.pec');
});

test('Method', () => {
	compareResourceEME('testing/method.pec');
});

test('Negative', () => {
	compareResourceEME('testing/negative.pec');
});

test('NegativeError', () => {
	compareResourceEME('testing/negativeError.pec');
});

test('Not', () => {
	compareResourceEME('testing/not.pec');
});

test('Or', () => {
	compareResourceEME('testing/or.pec');
});

test('Positive', () => {
	compareResourceEME('testing/positive.pec');
});

test('PositiveError', () => {
	compareResourceEME('testing/positiveError.pec');
});

