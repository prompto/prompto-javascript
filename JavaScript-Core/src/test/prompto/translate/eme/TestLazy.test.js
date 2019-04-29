var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Cyclic', () => {
	compareResourceEME('lazy/cyclic.pec');
});

test('Dict', () => {
	compareResourceEME('lazy/dict.pec');
});

test('List', () => {
	compareResourceEME('lazy/list.pec');
});

test('Set', () => {
	compareResourceEME('lazy/set.pec');
});

test('Transient', () => {
	compareResourceEME('lazy/transient.pec');
});

