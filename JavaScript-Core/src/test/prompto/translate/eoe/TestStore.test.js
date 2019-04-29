var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AsyncFetchMany', () => {
	compareResourceEOE('store/asyncFetchMany.pec');
});

test('AsyncFetchOne', () => {
	compareResourceEOE('store/asyncFetchOne.pec');
});

test('AsyncStore', () => {
	compareResourceEOE('store/asyncStore.pec');
});

test('DeleteRecords', () => {
	compareResourceEOE('store/deleteRecords.pec');
});

test('Flush', () => {
	compareResourceEOE('store/flush.pec');
});

test('ListRecords', () => {
	compareResourceEOE('store/listRecords.pec');
});

test('ManyRecords', () => {
	compareResourceEOE('store/manyRecords.pec');
});

test('ManyUntypedRecords', () => {
	compareResourceEOE('store/manyUntypedRecords.pec');
});

test('SimpleRecord', () => {
	compareResourceEOE('store/simpleRecord.pec');
});

test('SlicedRecords', () => {
	compareResourceEOE('store/slicedRecords.pec');
});

test('SortedRecords', () => {
	compareResourceEOE('store/sortedRecords.pec');
});

test('SubRecord', () => {
	compareResourceEOE('store/subRecord.pec');
});

test('UntypedRecord', () => {
	compareResourceEOE('store/untypedRecord.pec');
});

