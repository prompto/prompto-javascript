var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('And', () => {
	compareResourceOMO('testing/and.poc');
});

test('Contains', () => {
	compareResourceOMO('testing/contains.poc');
});

test('Greater', () => {
	compareResourceOMO('testing/greater.poc');
});

test('Method', () => {
	compareResourceOMO('testing/method.poc');
});

test('Negative', () => {
	compareResourceOMO('testing/negative.poc');
});

test('NegativeError', () => {
	compareResourceOMO('testing/negativeError.poc');
});

test('Not', () => {
	compareResourceOMO('testing/not.poc');
});

test('Or', () => {
	compareResourceOMO('testing/or.poc');
});

test('Positive', () => {
	compareResourceOMO('testing/positive.poc');
});

test('PositiveError', () => {
	compareResourceOMO('testing/positiveError.poc');
});

