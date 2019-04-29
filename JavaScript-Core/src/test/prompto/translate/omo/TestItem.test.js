var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ItemDict', () => {
	compareResourceOMO('item/itemDict.poc');
});

test('ItemList', () => {
	compareResourceOMO('item/itemList.poc');
});

test('ItemRange', () => {
	compareResourceOMO('item/itemRange.poc');
});

test('ItemSet', () => {
	compareResourceOMO('item/itemSet.poc');
});

test('ItemText', () => {
	compareResourceOMO('item/itemText.poc');
});

