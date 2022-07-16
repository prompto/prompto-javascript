var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AttributeConstructor', () => {
	compareResourceOMO('categories/attributeConstructor.poc');
});

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

test('EmptyConstructor', () => {
	compareResourceOMO('categories/emptyConstructor.poc');
});

test('Equals', () => {
	compareResourceOMO('categories/equals.poc');
});

test('LiteralConstructor', () => {
	compareResourceOMO('categories/literalConstructor.poc');
});

test('PopulateFalse', () => {
	compareResourceOMO('categories/populateFalse.poc');
});

test('ResourceAttribute', () => {
	compareResourceOMO('categories/resourceAttribute.poc');
});

test('SynonymConstructor', () => {
	compareResourceOMO('categories/synonymConstructor.poc');
});

test('ValueConstructor', () => {
	compareResourceOMO('categories/valueConstructor.poc');
});

