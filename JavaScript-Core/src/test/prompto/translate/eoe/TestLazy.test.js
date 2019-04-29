var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Cyclic', () => {
	compareResourceEOE('lazy/cyclic.pec');
});

test('Dict', () => {
	compareResourceEOE('lazy/dict.pec');
});

test('List', () => {
	compareResourceEOE('lazy/list.pec');
});

test('Set', () => {
	compareResourceEOE('lazy/set.pec');
});

test('Transient', () => {
	compareResourceEOE('lazy/transient.pec');
});

