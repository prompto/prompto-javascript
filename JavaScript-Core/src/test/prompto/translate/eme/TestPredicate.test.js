var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('And', () => {
	compareResourceEME('predicate/and.pec');
});

test('AndError', () => {
	compareResourceEME('predicate/andError.pec');
});

test('ContainsItem', () => {
	compareResourceEME('predicate/containsItem.pec');
});

test('Equals', () => {
	compareResourceEME('predicate/equals.pec');
});

test('EqualsError', () => {
	compareResourceEME('predicate/equalsError.pec');
});

test('Greater', () => {
	compareResourceEME('predicate/greater.pec');
});

test('HasItem', () => {
	compareResourceEME('predicate/hasItem.pec');
});

test('InList', () => {
	compareResourceEME('predicate/inList.pec');
});

test('Lesser', () => {
	compareResourceEME('predicate/lesser.pec');
});

test('NotEquals', () => {
	compareResourceEME('predicate/notEquals.pec');
});

test('Or', () => {
	compareResourceEME('predicate/or.pec');
});

test('OrError', () => {
	compareResourceEME('predicate/orError.pec');
});

test('Parenthesis', () => {
	compareResourceEME('predicate/parenthesis.pec');
});

test('ParenthesisError', () => {
	compareResourceEME('predicate/parenthesisError.pec');
});

test('Partial', () => {
	compareResourceEME('predicate/partial.pec');
});

test('Roughly', () => {
	compareResourceEME('predicate/roughly.pec');
});

