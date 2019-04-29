var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AnyAsParameter', () => {
	compareResourceEOE('categories/anyAsParameter.pec');
});

test('Composed', () => {
	compareResourceEOE('categories/composed.pec');
});

test('CopyFromAscendant', () => {
	compareResourceEOE('categories/copyFromAscendant.pec');
});

test('CopyFromAscendantWithOverride', () => {
	compareResourceEOE('categories/copyFromAscendantWithOverride.pec');
});

test('CopyFromDescendant', () => {
	compareResourceEOE('categories/copyFromDescendant.pec');
});

test('CopyFromDescendantWithOverride', () => {
	compareResourceEOE('categories/copyFromDescendantWithOverride.pec');
});

test('CopyFromDocument', () => {
	compareResourceEOE('categories/copyFromDocument.pec');
});

test('CopyFromStored', () => {
	compareResourceEOE('categories/copyFromStored.pec');
});

