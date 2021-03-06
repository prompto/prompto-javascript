var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AsyncFetchMany', () => {
	compareResourceEME('store/asyncFetchMany.pec');
});

test('AsyncFetchOne', () => {
	compareResourceEME('store/asyncFetchOne.pec');
});

test('AsyncStore', () => {
	compareResourceEME('store/asyncStore.pec');
});

test('DeleteRecords', () => {
	compareResourceEME('store/deleteRecords.pec');
});

test('FetchAnd', () => {
	compareResourceEME('store/fetchAnd.pec');
});

test('FetchBoolean', () => {
	compareResourceEME('store/fetchBoolean.pec');
});

test('FetchContains', () => {
	compareResourceEME('store/fetchContains.pec');
});

test('FetchGreater', () => {
	compareResourceEME('store/fetchGreater.pec');
});

test('FetchGreaterEqual', () => {
	compareResourceEME('store/fetchGreaterEqual.pec');
});

test('FetchHas', () => {
	compareResourceEME('store/fetchHas.pec');
});

test('FetchIn', () => {
	compareResourceEME('store/fetchIn.pec');
});

test('FetchLesser', () => {
	compareResourceEME('store/fetchLesser.pec');
});

test('FetchLesserEqual', () => {
	compareResourceEME('store/fetchLesserEqual.pec');
});

test('FetchNotBoolean', () => {
	compareResourceEME('store/fetchNotBoolean.pec');
});

test('FetchNotContains', () => {
	compareResourceEME('store/fetchNotContains.pec');
});

test('FetchNotHas', () => {
	compareResourceEME('store/fetchNotHas.pec');
});

test('FetchNotIn', () => {
	compareResourceEME('store/fetchNotIn.pec');
});

test('FetchOr', () => {
	compareResourceEME('store/fetchOr.pec');
});

test('Flush', () => {
	compareResourceEME('store/flush.pec');
});

test('ListRecords', () => {
	compareResourceEME('store/listRecords.pec');
});

test('ManyRecords', () => {
	compareResourceEME('store/manyRecords.pec');
});

test('ManyUntypedRecords', () => {
	compareResourceEME('store/manyUntypedRecords.pec');
});

test('SimpleRecord', () => {
	compareResourceEME('store/simpleRecord.pec');
});

test('SlicedRecords', () => {
	compareResourceEME('store/slicedRecords.pec');
});

test('SortedRecords', () => {
	compareResourceEME('store/sortedRecords.pec');
});

test('SubRecord', () => {
	compareResourceEME('store/subRecord.pec');
});

test('UntypedRecord', () => {
	compareResourceEME('store/untypedRecord.pec');
});

