var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ItemDict', () => {
	compareResourceEME('item/itemDict.pec');
});

test('ItemList', () => {
	compareResourceEME('item/itemList.pec');
});

test('ItemRange', () => {
	compareResourceEME('item/itemRange.pec');
});

test('ItemSet', () => {
	compareResourceEME('item/itemSet.pec');
});

test('ItemText', () => {
	compareResourceEME('item/itemText.pec');
});

