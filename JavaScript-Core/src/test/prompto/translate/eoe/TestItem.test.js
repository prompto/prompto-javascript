var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ItemDict', () => {
	compareResourceEOE('item/itemDict.pec');
});

test('ItemList', () => {
	compareResourceEOE('item/itemList.pec');
});

test('ItemRange', () => {
	compareResourceEOE('item/itemRange.pec');
});

test('ItemSet', () => {
	compareResourceEOE('item/itemSet.pec');
});

test('ItemText', () => {
	compareResourceEOE('item/itemText.pec');
});

