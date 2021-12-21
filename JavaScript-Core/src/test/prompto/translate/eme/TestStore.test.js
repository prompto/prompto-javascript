var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AsyncFetchMany', () => {
	compareResourceEME('store/asyncFetchMany.pec');
});

test('AsyncFetchManyInclude', () => {
	compareResourceEME('store/asyncFetchManyInclude.pec');
});

test('AsyncFetchOne', () => {
	compareResourceEME('store/asyncFetchOne.pec');
});

test('AsyncFetchOneInclude', () => {
	compareResourceEME('store/asyncFetchOneInclude.pec');
});

test('AsyncFetchOneNull', () => {
	compareResourceEME('store/asyncFetchOneNull.pec');
});

test('AsyncStore', () => {
	compareResourceEME('store/asyncStore.pec');
});

test('AuditDelete', () => {
	compareResourceEME('store/auditDelete.pec');
});

test('AuditInsert', () => {
	compareResourceEME('store/auditInsert.pec');
});

test('AuditMany', () => {
	compareResourceEME('store/auditMany.pec');
});

test('AuditMatching', () => {
	compareResourceEME('store/auditMatching.pec');
});

test('AuditUpdate', () => {
	compareResourceEME('store/auditUpdate.pec');
});

test('DeleteAudit', () => {
	compareResourceEME('store/deleteAudit.pec');
});

test('DeleteMeta', () => {
	compareResourceEME('store/deleteMeta.pec');
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

test('FetchManyInclude', () => {
	compareResourceEME('store/fetchManyInclude.pec');
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

test('FetchOneInclude', () => {
	compareResourceEME('store/fetchOneInclude.pec');
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

