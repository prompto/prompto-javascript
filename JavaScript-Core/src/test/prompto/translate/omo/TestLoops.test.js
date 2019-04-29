var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('DoWhile', () => {
	compareResourceOMO('loops/doWhile.poc');
});

test('DoWhileBreak', () => {
	compareResourceOMO('loops/doWhileBreak.poc');
});

test('EmbeddedForEach', () => {
	compareResourceOMO('loops/embeddedForEach.poc');
});

test('ForEachBreak', () => {
	compareResourceOMO('loops/forEachBreak.poc');
});

test('ForEachCharacterRange', () => {
	compareResourceOMO('loops/forEachCharacterRange.poc');
});

test('ForEachCharacterRangeWithIndex', () => {
	compareResourceOMO('loops/forEachCharacterRangeWithIndex.poc');
});

test('ForEachDateRange', () => {
	compareResourceOMO('loops/forEachDateRange.poc');
});

test('ForEachDateRangeWithIndex', () => {
	compareResourceOMO('loops/forEachDateRangeWithIndex.poc');
});

test('ForEachDictionaryItem', () => {
	compareResourceOMO('loops/forEachDictionaryItem.poc');
});

test('ForEachDictionaryItemWithIndex', () => {
	compareResourceOMO('loops/forEachDictionaryItemWithIndex.poc');
});

test('ForEachDictionaryKey', () => {
	compareResourceOMO('loops/forEachDictionaryKey.poc');
});

test('ForEachDictionaryKeyWithIndex', () => {
	compareResourceOMO('loops/forEachDictionaryKeyWithIndex.poc');
});

test('ForEachDictionaryValue', () => {
	compareResourceOMO('loops/forEachDictionaryValue.poc');
});

test('ForEachDictionaryValueWithIndex', () => {
	compareResourceOMO('loops/forEachDictionaryValueWithIndex.poc');
});

test('ForEachInstanceList', () => {
	compareResourceOMO('loops/forEachInstanceList.poc');
});

test('ForEachInstanceListWithIndex', () => {
	compareResourceOMO('loops/forEachInstanceListWithIndex.poc');
});

test('ForEachInstanceSet', () => {
	compareResourceOMO('loops/forEachInstanceSet.poc');
});

test('ForEachInstanceSetWithIndex', () => {
	compareResourceOMO('loops/forEachInstanceSetWithIndex.poc');
});

test('ForEachIntegerList', () => {
	compareResourceOMO('loops/forEachIntegerList.poc');
});

test('ForEachIntegerListWithIndex', () => {
	compareResourceOMO('loops/forEachIntegerListWithIndex.poc');
});

test('ForEachIntegerRange', () => {
	compareResourceOMO('loops/forEachIntegerRange.poc');
});

test('ForEachIntegerRangeWithIndex', () => {
	compareResourceOMO('loops/forEachIntegerRangeWithIndex.poc');
});

test('ForEachIntegerSet', () => {
	compareResourceOMO('loops/forEachIntegerSet.poc');
});

test('ForEachIntegerSetWithIndex', () => {
	compareResourceOMO('loops/forEachIntegerSetWithIndex.poc');
});

test('ForEachTimeRange', () => {
	compareResourceOMO('loops/forEachTimeRange.poc');
});

test('ForEachTimeRangeWithIndex', () => {
	compareResourceOMO('loops/forEachTimeRangeWithIndex.poc');
});

test('ForEachTupleList', () => {
	compareResourceOMO('loops/forEachTupleList.poc');
});

test('ForEachTupleListWithIndex', () => {
	compareResourceOMO('loops/forEachTupleListWithIndex.poc');
});

test('ForEachTupleSet', () => {
	compareResourceOMO('loops/forEachTupleSet.poc');
});

test('ForEachTupleSetWithIndex', () => {
	compareResourceOMO('loops/forEachTupleSetWithIndex.poc');
});

test('While', () => {
	compareResourceOMO('loops/while.poc');
});

test('WhileBreak', () => {
	compareResourceOMO('loops/whileBreak.poc');
});

