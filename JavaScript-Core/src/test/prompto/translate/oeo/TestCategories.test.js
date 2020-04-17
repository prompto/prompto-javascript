var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('CopyFromAscendant', () => {
	compareResourceOEO('categories/copyFromAscendant.poc');
});

test('CopyFromAscendantWithOverride', () => {
	compareResourceOEO('categories/copyFromAscendantWithOverride.poc');
});

test('CopyFromDescendant', () => {
	compareResourceOEO('categories/copyFromDescendant.poc');
});

test('CopyFromDescendantWithOverride', () => {
	compareResourceOEO('categories/copyFromDescendantWithOverride.poc');
});

test('CopyFromDocument', () => {
	compareResourceOEO('categories/copyFromDocument.poc');
});

test('CopyFromStored', () => {
	compareResourceOEO('categories/copyFromStored.poc');
});

test('PopulateFalse', () => {
	compareResourceOEO('categories/populateFalse.poc');
});

