var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('And', () => {
	compareResourceEOE('predicate/and.pec');
});

test('AndError', () => {
	compareResourceEOE('predicate/andError.pec');
});

test('ContainsItem', () => {
	compareResourceEOE('predicate/containsItem.pec');
});

test('Equals', () => {
	compareResourceEOE('predicate/equals.pec');
});

test('EqualsError', () => {
	compareResourceEOE('predicate/equalsError.pec');
});

test('Greater', () => {
	compareResourceEOE('predicate/greater.pec');
});

test('HasItem', () => {
	compareResourceEOE('predicate/hasItem.pec');
});

test('InList', () => {
	compareResourceEOE('predicate/inList.pec');
});

test('Lesser', () => {
	compareResourceEOE('predicate/lesser.pec');
});

test('NotEquals', () => {
	compareResourceEOE('predicate/notEquals.pec');
});

test('Or', () => {
	compareResourceEOE('predicate/or.pec');
});

test('OrError', () => {
	compareResourceEOE('predicate/orError.pec');
});

test('Parenthesis', () => {
	compareResourceEOE('predicate/parenthesis.pec');
});

test('ParenthesisError', () => {
	compareResourceEOE('predicate/parenthesisError.pec');
});

test('Partial', () => {
	compareResourceEOE('predicate/partial.pec');
});

test('Roughly', () => {
	compareResourceEOE('predicate/roughly.pec');
});

