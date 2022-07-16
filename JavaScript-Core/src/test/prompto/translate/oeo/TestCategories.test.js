var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AttributeConstructor', () => {
	compareResourceOEO('categories/attributeConstructor.poc');
});

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

test('EmptyConstructor', () => {
	compareResourceOEO('categories/emptyConstructor.poc');
});

test('Equals', () => {
	compareResourceOEO('categories/equals.poc');
});

test('LiteralConstructor', () => {
	compareResourceOEO('categories/literalConstructor.poc');
});

test('PopulateFalse', () => {
	compareResourceOEO('categories/populateFalse.poc');
});

test('ResourceAttribute', () => {
	compareResourceOEO('categories/resourceAttribute.poc');
});

test('SynonymConstructor', () => {
	compareResourceOEO('categories/synonymConstructor.poc');
});

test('ValueConstructor', () => {
	compareResourceOEO('categories/valueConstructor.poc');
});

