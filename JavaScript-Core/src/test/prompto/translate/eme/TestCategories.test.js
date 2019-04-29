var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AnyAsParameter', () => {
	compareResourceEME('categories/anyAsParameter.pec');
});

test('Composed', () => {
	compareResourceEME('categories/composed.pec');
});

test('CopyFromAscendant', () => {
	compareResourceEME('categories/copyFromAscendant.pec');
});

test('CopyFromAscendantWithOverride', () => {
	compareResourceEME('categories/copyFromAscendantWithOverride.pec');
});

test('CopyFromDescendant', () => {
	compareResourceEME('categories/copyFromDescendant.pec');
});

test('CopyFromDescendantWithOverride', () => {
	compareResourceEME('categories/copyFromDescendantWithOverride.pec');
});

test('CopyFromDocument', () => {
	compareResourceEME('categories/copyFromDocument.pec');
});

test('CopyFromStored', () => {
	compareResourceEME('categories/copyFromStored.pec');
});

