var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DoWhile', () => {
	checkInterpretedOutput('loops/doWhile.pec');
});

test('Transpiled DoWhile', () => {
	checkTranspiledOutput('loops/doWhile.pec');
});

test('Interpreted DoWhileBreak', () => {
	checkInterpretedOutput('loops/doWhileBreak.pec');
});

test('Transpiled DoWhileBreak', () => {
	checkTranspiledOutput('loops/doWhileBreak.pec');
});

test('Interpreted EmbeddedForEach', () => {
	checkInterpretedOutput('loops/embeddedForEach.pec');
});

test('Transpiled EmbeddedForEach', () => {
	checkTranspiledOutput('loops/embeddedForEach.pec');
});

test('Interpreted ForEachBreak', () => {
	checkInterpretedOutput('loops/forEachBreak.pec');
});

test('Transpiled ForEachBreak', () => {
	checkTranspiledOutput('loops/forEachBreak.pec');
});

test('Interpreted ForEachCharacterRange', () => {
	checkInterpretedOutput('loops/forEachCharacterRange.pec');
});

test('Transpiled ForEachCharacterRange', () => {
	checkTranspiledOutput('loops/forEachCharacterRange.pec');
});

test('Interpreted ForEachCharacterRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachCharacterRangeWithIndex.pec');
});

test('Transpiled ForEachCharacterRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachCharacterRangeWithIndex.pec');
});

test('Interpreted ForEachDateRange', () => {
	checkInterpretedOutput('loops/forEachDateRange.pec');
});

test('Transpiled ForEachDateRange', () => {
	checkTranspiledOutput('loops/forEachDateRange.pec');
});

test('Interpreted ForEachDateRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachDateRangeWithIndex.pec');
});

test('Transpiled ForEachDateRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachDateRangeWithIndex.pec');
});

test('Interpreted ForEachDictionaryItem', () => {
	checkInterpretedOutput('loops/forEachDictionaryItem.pec');
});

test('Transpiled ForEachDictionaryItem', () => {
	checkTranspiledOutput('loops/forEachDictionaryItem.pec');
});

test('Interpreted ForEachDictionaryItemWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryItemWithIndex.pec');
});

test('Transpiled ForEachDictionaryItemWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryItemWithIndex.pec');
});

test('Interpreted ForEachDictionaryKey', () => {
	checkInterpretedOutput('loops/forEachDictionaryKey.pec');
});

test('Transpiled ForEachDictionaryKey', () => {
	checkTranspiledOutput('loops/forEachDictionaryKey.pec');
});

test('Interpreted ForEachDictionaryKeyWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryKeyWithIndex.pec');
});

test('Transpiled ForEachDictionaryKeyWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryKeyWithIndex.pec');
});

test('Interpreted ForEachDictionaryValue', () => {
	checkInterpretedOutput('loops/forEachDictionaryValue.pec');
});

test('Transpiled ForEachDictionaryValue', () => {
	checkTranspiledOutput('loops/forEachDictionaryValue.pec');
});

test('Interpreted ForEachDictionaryValueWithIndex', () => {
	checkInterpretedOutput('loops/forEachDictionaryValueWithIndex.pec');
});

test('Transpiled ForEachDictionaryValueWithIndex', () => {
	checkTranspiledOutput('loops/forEachDictionaryValueWithIndex.pec');
});

test('Interpreted ForEachInstanceList', () => {
	checkInterpretedOutput('loops/forEachInstanceList.pec');
});

test('Transpiled ForEachInstanceList', () => {
	checkTranspiledOutput('loops/forEachInstanceList.pec');
});

test('Interpreted ForEachInstanceListWithIndex', () => {
	checkInterpretedOutput('loops/forEachInstanceListWithIndex.pec');
});

test('Transpiled ForEachInstanceListWithIndex', () => {
	checkTranspiledOutput('loops/forEachInstanceListWithIndex.pec');
});

test('Interpreted ForEachInstanceSet', () => {
	checkInterpretedOutput('loops/forEachInstanceSet.pec');
});

test('Transpiled ForEachInstanceSet', () => {
	checkTranspiledOutput('loops/forEachInstanceSet.pec');
});

test('Interpreted ForEachInstanceSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachInstanceSetWithIndex.pec');
});

test('Transpiled ForEachInstanceSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachInstanceSetWithIndex.pec');
});

test('Interpreted ForEachIntegerList', () => {
	checkInterpretedOutput('loops/forEachIntegerList.pec');
});

test('Transpiled ForEachIntegerList', () => {
	checkTranspiledOutput('loops/forEachIntegerList.pec');
});

test('Interpreted ForEachIntegerListWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerListWithIndex.pec');
});

test('Transpiled ForEachIntegerListWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerListWithIndex.pec');
});

test('Interpreted ForEachIntegerRange', () => {
	checkInterpretedOutput('loops/forEachIntegerRange.pec');
});

test('Transpiled ForEachIntegerRange', () => {
	checkTranspiledOutput('loops/forEachIntegerRange.pec');
});

test('Interpreted ForEachIntegerRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerRangeWithIndex.pec');
});

test('Transpiled ForEachIntegerRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerRangeWithIndex.pec');
});

test('Interpreted ForEachIntegerSet', () => {
	checkInterpretedOutput('loops/forEachIntegerSet.pec');
});

test('Transpiled ForEachIntegerSet', () => {
	checkTranspiledOutput('loops/forEachIntegerSet.pec');
});

test('Interpreted ForEachIntegerSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachIntegerSetWithIndex.pec');
});

test('Transpiled ForEachIntegerSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachIntegerSetWithIndex.pec');
});

test('Interpreted ForEachTimeRange', () => {
	checkInterpretedOutput('loops/forEachTimeRange.pec');
});

test('Transpiled ForEachTimeRange', () => {
	checkTranspiledOutput('loops/forEachTimeRange.pec');
});

test('Interpreted ForEachTimeRangeWithIndex', () => {
	checkInterpretedOutput('loops/forEachTimeRangeWithIndex.pec');
});

test('Transpiled ForEachTimeRangeWithIndex', () => {
	checkTranspiledOutput('loops/forEachTimeRangeWithIndex.pec');
});

test('Interpreted ForEachTupleList', () => {
	checkInterpretedOutput('loops/forEachTupleList.pec');
});

test('Transpiled ForEachTupleList', () => {
	checkTranspiledOutput('loops/forEachTupleList.pec');
});

test('Interpreted ForEachTupleListWithIndex', () => {
	checkInterpretedOutput('loops/forEachTupleListWithIndex.pec');
});

test('Transpiled ForEachTupleListWithIndex', () => {
	checkTranspiledOutput('loops/forEachTupleListWithIndex.pec');
});

test('Interpreted ForEachTupleSet', () => {
	checkInterpretedOutput('loops/forEachTupleSet.pec');
});

test('Transpiled ForEachTupleSet', () => {
	checkTranspiledOutput('loops/forEachTupleSet.pec');
});

test('Interpreted ForEachTupleSetWithIndex', () => {
	checkInterpretedOutput('loops/forEachTupleSetWithIndex.pec');
});

test('Transpiled ForEachTupleSetWithIndex', () => {
	checkTranspiledOutput('loops/forEachTupleSetWithIndex.pec');
});

test('Interpreted While', () => {
	checkInterpretedOutput('loops/while.pec');
});

test('Transpiled While', () => {
	checkTranspiledOutput('loops/while.pec');
});

test('Interpreted WhileBreak', () => {
	checkInterpretedOutput('loops/whileBreak.pec');
});

test('Transpiled WhileBreak', () => {
	checkTranspiledOutput('loops/whileBreak.pec');
});

