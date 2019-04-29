var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DoWhile', () => {
	checkInterpretedOutput('loops/doWhile.poc');
});

test('Transpiled DoWhile', () => {
	checkTranspiledOutput('loops/doWhile.poc');
});

test('Interpreted DoWhileBreak', () => {
	checkInterpretedOutput('loops/doWhileBreak.poc');
});

test('Transpiled DoWhileBreak', () => {
	checkTranspiledOutput('loops/doWhileBreak.poc');
});

test('Interpreted EmbeddedForEach', () => {
	checkInterpretedOutput('loops/embeddedForEach.poc');
});

test('Transpiled EmbeddedForEach', () => {
	checkTranspiledOutput('loops/embeddedForEach.poc');
});

test('Interpreted ForEachBreak', () => {
	checkInterpretedOutput('loops/forEachBreak.poc');
});

test('Transpiled ForEachBreak', () => {
	checkTranspiledOutput('loops/forEachBreak.poc');
});

test('Interpreted ForEachCharacterRange', () => {
	checkInterpretedOutput('loops/forEachCharacterRange.poc');
});

test('Transpiled ForEachCharacterRange', () => {
	checkTranspiledOutput('loops/forEachCharacterRange.poc');
});

test('Interpreted ForEachCharacterRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachCharacterRangeWithIndex.poc');
});

test('Transpiled ForEachCharacterRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachCharacterRangeWithIndex.poc');
});

test('Interpreted ForEachDateRange', () => {
	checkInterpretedOutput('loops/forEachDateRange.poc');
});

test('Transpiled ForEachDateRange', () => {
	checkTranspiledOutput('loops/forEachDateRange.poc');
});

test('Interpreted ForEachDateRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachDateRangeWithIndex.poc');
});

test('Transpiled ForEachDateRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachDateRangeWithIndex.poc');
});

test('Interpreted ForEachDictionaryItem', () => {
	checkInterpretedOutput('loops/forEachDictionaryItem.poc');
});

test('Transpiled ForEachDictionaryItem', () => {
	checkTranspiledOutput('loops/forEachDictionaryItem.poc');
});

test('Interpreted ForEachDictionaryItemWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryItemWithIndex.poc');
});

test('Transpiled ForEachDictionaryItemWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryItemWithIndex.poc');
});

test('Interpreted ForEachDictionaryKey', () => {
	checkInterpretedOutput('loops/forEachDictionaryKey.poc');
});

test('Transpiled ForEachDictionaryKey', () => {
	checkTranspiledOutput('loops/forEachDictionaryKey.poc');
});

test('Interpreted ForEachDictionaryKeyWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryKeyWithIndex.poc');
});

test('Transpiled ForEachDictionaryKeyWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryKeyWithIndex.poc');
});

test('Interpreted ForEachDictionaryValue', () => {
	checkInterpretedOutput('loops/forEachDictionaryValue.poc');
});

test('Transpiled ForEachDictionaryValue', () => {
	checkTranspiledOutput('loops/forEachDictionaryValue.poc');
});

test('Interpreted ForEachDictionaryValueWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryValueWithIndex.poc');
});

test('Transpiled ForEachDictionaryValueWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryValueWithIndex.poc');
});

test('Interpreted ForEachInstanceList', () => {
	checkInterpretedOutput('loops/forEachInstanceList.poc');
});

test('Transpiled ForEachInstanceList', () => {
	checkTranspiledOutput('loops/forEachInstanceList.poc');
});

test('Interpreted ForEachInstanceListWithIndex', () => {
	checkInterpretedOutput('loops/forEachInstanceListWithIndex.poc');
});

test('Transpiled ForEachInstanceListWithIndex', () => {
	checkTranspiledOutput('loops/forEachInstanceListWithIndex.poc');
});

test('Interpreted ForEachInstanceSet', () => {
	checkInterpretedOutput('loops/forEachInstanceSet.poc');
});

test('Transpiled ForEachInstanceSet', () => {
	checkTranspiledOutput('loops/forEachInstanceSet.poc');
});

test('Interpreted ForEachInstanceSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachInstanceSetWithIndex.poc');
});

test('Transpiled ForEachInstanceSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachInstanceSetWithIndex.poc');
});

test('Interpreted ForEachIntegerList', () => {
	checkInterpretedOutput('loops/forEachIntegerList.poc');
});

test('Transpiled ForEachIntegerList', () => {
	checkTranspiledOutput('loops/forEachIntegerList.poc');
});

test('Interpreted ForEachIntegerListWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerListWithIndex.poc');
});

test('Transpiled ForEachIntegerListWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerListWithIndex.poc');
});

test('Interpreted ForEachIntegerRange', () => {
	checkInterpretedOutput('loops/forEachIntegerRange.poc');
});

test('Transpiled ForEachIntegerRange', () => {
	checkTranspiledOutput('loops/forEachIntegerRange.poc');
});

test('Interpreted ForEachIntegerRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerRangeWithIndex.poc');
});

test('Transpiled ForEachIntegerRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerRangeWithIndex.poc');
});

test('Interpreted ForEachIntegerSet', () => {
	checkInterpretedOutput('loops/forEachIntegerSet.poc');
});

test('Transpiled ForEachIntegerSet', () => {
	checkTranspiledOutput('loops/forEachIntegerSet.poc');
});

test('Interpreted ForEachIntegerSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerSetWithIndex.poc');
});

test('Transpiled ForEachIntegerSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerSetWithIndex.poc');
});

test('Interpreted ForEachTimeRange', () => {
	checkInterpretedOutput('loops/forEachTimeRange.poc');
});

test('Transpiled ForEachTimeRange', () => {
	checkTranspiledOutput('loops/forEachTimeRange.poc');
});

test('Interpreted ForEachTimeRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachTimeRangeWithIndex.poc');
});

test('Transpiled ForEachTimeRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachTimeRangeWithIndex.poc');
});

test('Interpreted ForEachTupleList', () => {
	checkInterpretedOutput('loops/forEachTupleList.poc');
});

test('Transpiled ForEachTupleList', () => {
	checkTranspiledOutput('loops/forEachTupleList.poc');
});

test('Interpreted ForEachTupleListWithIndex', () => {
	checkInterpretedOutput('loops/forEachTupleListWithIndex.poc');
});

test('Transpiled ForEachTupleListWithIndex', () => {
	checkTranspiledOutput('loops/forEachTupleListWithIndex.poc');
});

test('Interpreted ForEachTupleSet', () => {
	checkInterpretedOutput('loops/forEachTupleSet.poc');
});

test('Transpiled ForEachTupleSet', () => {
	checkTranspiledOutput('loops/forEachTupleSet.poc');
});

test('Interpreted ForEachTupleSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachTupleSetWithIndex.poc');
});

test('Transpiled ForEachTupleSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachTupleSetWithIndex.poc');
});

test('Interpreted While', () => {
	checkInterpretedOutput('loops/while.poc');
});

test('Transpiled While', () => {
	checkTranspiledOutput('loops/while.poc');
});

test('Interpreted WhileBreak', () => {
	checkInterpretedOutput('loops/whileBreak.poc');
});

test('Transpiled WhileBreak', () => {
	checkTranspiledOutput('loops/whileBreak.poc');
});

