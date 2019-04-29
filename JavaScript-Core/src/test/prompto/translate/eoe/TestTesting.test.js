var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('And', () => {
	compareResourceEOE('testing/and.pec');
});

test('Contains', () => {
	compareResourceEOE('testing/contains.pec');
});

test('Greater', () => {
	compareResourceEOE('testing/greater.pec');
});

test('Method', () => {
	compareResourceEOE('testing/method.pec');
});

test('Negative', () => {
	compareResourceEOE('testing/negative.pec');
});

test('NegativeError', () => {
	compareResourceEOE('testing/negativeError.pec');
});

test('Not', () => {
	compareResourceEOE('testing/not.pec');
});

test('Or', () => {
	compareResourceEOE('testing/or.pec');
});

test('Positive', () => {
	compareResourceEOE('testing/positive.pec');
});

test('PositiveError', () => {
	compareResourceEOE('testing/positiveError.pec');
});

