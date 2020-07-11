var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

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

test('Partial', () => {
	compareResourceEME('predicate/partial.pec');
});

test('Roughly', () => {
	compareResourceEME('predicate/roughly.pec');
});

