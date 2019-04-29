var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Cyclic', () => {
	compareResourceOMO('lazy/cyclic.poc');
});

test('Dict', () => {
	compareResourceOMO('lazy/dict.poc');
});

test('List', () => {
	compareResourceOMO('lazy/list.poc');
});

test('Set', () => {
	compareResourceOMO('lazy/set.poc');
});

test('Transient', () => {
	compareResourceOMO('lazy/transient.poc');
});

