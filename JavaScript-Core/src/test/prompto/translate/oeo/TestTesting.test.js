var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('And', () => {
	compareResourceOEO('testing/and.poc');
});

test('Contains', () => {
	compareResourceOEO('testing/contains.poc');
});

test('Greater', () => {
	compareResourceOEO('testing/greater.poc');
});

test('Method', () => {
	compareResourceOEO('testing/method.poc');
});

test('Negative', () => {
	compareResourceOEO('testing/negative.poc');
});

test('NegativeError', () => {
	compareResourceOEO('testing/negativeError.poc');
});

test('Not', () => {
	compareResourceOEO('testing/not.poc');
});

test('Or', () => {
	compareResourceOEO('testing/or.poc');
});

test('Positive', () => {
	compareResourceOEO('testing/positive.poc');
});

test('PositiveError', () => {
	compareResourceOEO('testing/positiveError.poc');
});

