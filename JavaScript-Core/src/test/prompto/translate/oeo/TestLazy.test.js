var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Cyclic', () => {
	compareResourceOEO('lazy/cyclic.poc');
});

test('Dict', () => {
	compareResourceOEO('lazy/dict.poc');
});

test('List', () => {
	compareResourceOEO('lazy/list.poc');
});

test('Set', () => {
	compareResourceOEO('lazy/set.poc');
});

test('Transient', () => {
	compareResourceOEO('lazy/transient.poc');
});

