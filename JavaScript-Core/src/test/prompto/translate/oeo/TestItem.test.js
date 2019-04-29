var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ItemDict', () => {
	compareResourceOEO('item/itemDict.poc');
});

test('ItemList', () => {
	compareResourceOEO('item/itemList.poc');
});

test('ItemRange', () => {
	compareResourceOEO('item/itemRange.poc');
});

test('ItemSet', () => {
	compareResourceOEO('item/itemSet.poc');
});

test('ItemText', () => {
	compareResourceOEO('item/itemText.poc');
});

