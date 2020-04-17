var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('CopyFromAscendant', () => {
	compareResourceOMO('categories/copyFromAscendant.poc');
});

test('CopyFromAscendantWithOverride', () => {
	compareResourceOMO('categories/copyFromAscendantWithOverride.poc');
});

test('CopyFromDescendant', () => {
	compareResourceOMO('categories/copyFromDescendant.poc');
});

test('CopyFromDescendantWithOverride', () => {
	compareResourceOMO('categories/copyFromDescendantWithOverride.poc');
});

test('CopyFromDocument', () => {
	compareResourceOMO('categories/copyFromDocument.poc');
});

test('CopyFromStored', () => {
	compareResourceOMO('categories/copyFromStored.poc');
});

test('PopulateFalse', () => {
	compareResourceOMO('categories/populateFalse.poc');
});

