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

test('AuditDelete', () => {
	compareResourceEOE('store/auditDelete.pec');
});

test('AuditInsert', () => {
	compareResourceEOE('store/auditInsert.pec');
});

test('AuditMany', () => {
	compareResourceEOE('store/auditMany.pec');
});

test('AuditMatching', () => {
	compareResourceEOE('store/auditMatching.pec');
});

test('AuditUpdate', () => {
	compareResourceEOE('store/auditUpdate.pec');
});

test('DeleteAudit', () => {
	compareResourceEOE('store/deleteAudit.pec');
});

test('DeleteMeta', () => {
	compareResourceEOE('store/deleteMeta.pec');
});

test('DeleteRecords', () => {
	compareResourceEOE('store/deleteRecords.pec');
});

test('FetchAnd', () => {
	compareResourceEOE('store/fetchAnd.pec');
});

test('FetchBoolean', () => {
	compareResourceEOE('store/fetchBoolean.pec');
});

test('FetchContains', () => {
	compareResourceEOE('store/fetchContains.pec');
});

test('FetchGreater', () => {
	compareResourceEOE('store/fetchGreater.pec');
});

test('FetchGreaterEqual', () => {
	compareResourceEOE('store/fetchGreaterEqual.pec');
});

test('FetchHas', () => {
	compareResourceEOE('store/fetchHas.pec');
});

test('FetchIn', () => {
	compareResourceEOE('store/fetchIn.pec');
});

test('FetchLesser', () => {
	compareResourceEOE('store/fetchLesser.pec');
});

test('FetchLesserEqual', () => {
	compareResourceEOE('store/fetchLesserEqual.pec');
});

test('FetchNotBoolean', () => {
	compareResourceEOE('store/fetchNotBoolean.pec');
});

test('FetchNotContains', () => {
	compareResourceEOE('store/fetchNotContains.pec');
});

test('FetchNotHas', () => {
	compareResourceEOE('store/fetchNotHas.pec');
});

test('FetchNotIn', () => {
	compareResourceEOE('store/fetchNotIn.pec');
});

test('FetchOr', () => {
	compareResourceEOE('store/fetchOr.pec');
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

