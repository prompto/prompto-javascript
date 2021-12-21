var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AsyncFetchMany', () => {
	checkInterpretedOutput('store/asyncFetchMany.pec');
});

test('Transpiled AsyncFetchMany', () => {
	checkTranspiledOutput('store/asyncFetchMany.pec');
});

test('Interpreted AsyncFetchManyInclude', () => {
	checkInterpretedOutput('store/asyncFetchManyInclude.pec');
});

test('Transpiled AsyncFetchManyInclude', () => {
	checkTranspiledOutput('store/asyncFetchManyInclude.pec');
});

test('Interpreted AsyncFetchOne', () => {
	checkInterpretedOutput('store/asyncFetchOne.pec');
});

test('Transpiled AsyncFetchOne', () => {
	checkTranspiledOutput('store/asyncFetchOne.pec');
});

test('Interpreted AsyncFetchOneInclude', () => {
	checkInterpretedOutput('store/asyncFetchOneInclude.pec');
});

test('Transpiled AsyncFetchOneInclude', () => {
	checkTranspiledOutput('store/asyncFetchOneInclude.pec');
});

test('Interpreted AsyncFetchOneNull', () => {
	checkInterpretedOutput('store/asyncFetchOneNull.pec');
});

test('Transpiled AsyncFetchOneNull', () => {
	checkTranspiledOutput('store/asyncFetchOneNull.pec');
});

test('Interpreted AsyncStore', () => {
	checkInterpretedOutput('store/asyncStore.pec');
});

test('Transpiled AsyncStore', () => {
	checkTranspiledOutput('store/asyncStore.pec');
});

test('Interpreted AuditDelete', () => {
	checkInterpretedOutput('store/auditDelete.pec');
});

test('Transpiled AuditDelete', () => {
	checkTranspiledOutput('store/auditDelete.pec');
});

test('Interpreted AuditInsert', () => {
	checkInterpretedOutput('store/auditInsert.pec');
});

test('Transpiled AuditInsert', () => {
	checkTranspiledOutput('store/auditInsert.pec');
});

test('Interpreted AuditMany', () => {
	checkInterpretedOutput('store/auditMany.pec');
});

test('Transpiled AuditMany', () => {
	checkTranspiledOutput('store/auditMany.pec');
});

test('Interpreted AuditMatching', () => {
	checkInterpretedOutput('store/auditMatching.pec');
});

test('Transpiled AuditMatching', () => {
	checkTranspiledOutput('store/auditMatching.pec');
});

test('Interpreted AuditUpdate', () => {
	checkInterpretedOutput('store/auditUpdate.pec');
});

test('Transpiled AuditUpdate', () => {
	checkTranspiledOutput('store/auditUpdate.pec');
});

test('Interpreted DeleteAudit', () => {
	checkInterpretedOutput('store/deleteAudit.pec');
});

test('Transpiled DeleteAudit', () => {
	checkTranspiledOutput('store/deleteAudit.pec');
});

test('Interpreted DeleteMeta', () => {
	checkInterpretedOutput('store/deleteMeta.pec');
});

test('Transpiled DeleteMeta', () => {
	checkTranspiledOutput('store/deleteMeta.pec');
});

test('Interpreted DeleteRecords', () => {
	checkInterpretedOutput('store/deleteRecords.pec');
});

test('Transpiled DeleteRecords', () => {
	checkTranspiledOutput('store/deleteRecords.pec');
});

test('Interpreted FetchAnd', () => {
	checkInterpretedOutput('store/fetchAnd.pec');
});

test('Transpiled FetchAnd', () => {
	checkTranspiledOutput('store/fetchAnd.pec');
});

test('Interpreted FetchBoolean', () => {
	checkInterpretedOutput('store/fetchBoolean.pec');
});

test('Transpiled FetchBoolean', () => {
	checkTranspiledOutput('store/fetchBoolean.pec');
});

test('Interpreted FetchContains', () => {
	checkInterpretedOutput('store/fetchContains.pec');
});

test('Transpiled FetchContains', () => {
	checkTranspiledOutput('store/fetchContains.pec');
});

test('Interpreted FetchGreater', () => {
	checkInterpretedOutput('store/fetchGreater.pec');
});

test('Transpiled FetchGreater', () => {
	checkTranspiledOutput('store/fetchGreater.pec');
});

test('Interpreted FetchGreaterEqual', () => {
	checkInterpretedOutput('store/fetchGreaterEqual.pec');
});

test('Transpiled FetchGreaterEqual', () => {
	checkTranspiledOutput('store/fetchGreaterEqual.pec');
});

test('Interpreted FetchHas', () => {
	checkInterpretedOutput('store/fetchHas.pec');
});

test('Transpiled FetchHas', () => {
	checkTranspiledOutput('store/fetchHas.pec');
});

test('Interpreted FetchIn', () => {
	checkInterpretedOutput('store/fetchIn.pec');
});

test('Transpiled FetchIn', () => {
	checkTranspiledOutput('store/fetchIn.pec');
});

test('Interpreted FetchLesser', () => {
	checkInterpretedOutput('store/fetchLesser.pec');
});

test('Transpiled FetchLesser', () => {
	checkTranspiledOutput('store/fetchLesser.pec');
});

test('Interpreted FetchLesserEqual', () => {
	checkInterpretedOutput('store/fetchLesserEqual.pec');
});

test('Transpiled FetchLesserEqual', () => {
	checkTranspiledOutput('store/fetchLesserEqual.pec');
});

test('Interpreted FetchManyInclude', () => {
	checkInterpretedOutput('store/fetchManyInclude.pec');
});

test('Transpiled FetchManyInclude', () => {
	checkTranspiledOutput('store/fetchManyInclude.pec');
});

test('Interpreted FetchNotBoolean', () => {
	checkInterpretedOutput('store/fetchNotBoolean.pec');
});

test('Transpiled FetchNotBoolean', () => {
	checkTranspiledOutput('store/fetchNotBoolean.pec');
});

test('Interpreted FetchNotContains', () => {
	checkInterpretedOutput('store/fetchNotContains.pec');
});

test('Transpiled FetchNotContains', () => {
	checkTranspiledOutput('store/fetchNotContains.pec');
});

test('Interpreted FetchNotHas', () => {
	checkInterpretedOutput('store/fetchNotHas.pec');
});

test('Transpiled FetchNotHas', () => {
	checkTranspiledOutput('store/fetchNotHas.pec');
});

test('Interpreted FetchNotIn', () => {
	checkInterpretedOutput('store/fetchNotIn.pec');
});

test('Transpiled FetchNotIn', () => {
	checkTranspiledOutput('store/fetchNotIn.pec');
});

test('Interpreted FetchOneInclude', () => {
	checkInterpretedOutput('store/fetchOneInclude.pec');
});

test('Transpiled FetchOneInclude', () => {
	checkTranspiledOutput('store/fetchOneInclude.pec');
});

test('Interpreted FetchOr', () => {
	checkInterpretedOutput('store/fetchOr.pec');
});

test('Transpiled FetchOr', () => {
	checkTranspiledOutput('store/fetchOr.pec');
});

test('Interpreted Flush', () => {
	checkInterpretedOutput('store/flush.pec');
});

test('Transpiled Flush', () => {
	checkTranspiledOutput('store/flush.pec');
});

test('Interpreted ListRecords', () => {
	checkInterpretedOutput('store/listRecords.pec');
});

test('Transpiled ListRecords', () => {
	checkTranspiledOutput('store/listRecords.pec');
});

test('Interpreted ManyRecords', () => {
	checkInterpretedOutput('store/manyRecords.pec');
});

test('Transpiled ManyRecords', () => {
	checkTranspiledOutput('store/manyRecords.pec');
});

test('Interpreted ManyUntypedRecords', () => {
	checkInterpretedOutput('store/manyUntypedRecords.pec');
});

test('Transpiled ManyUntypedRecords', () => {
	checkTranspiledOutput('store/manyUntypedRecords.pec');
});

test('Interpreted SimpleRecord', () => {
	checkInterpretedOutput('store/simpleRecord.pec');
});

test('Transpiled SimpleRecord', () => {
	checkTranspiledOutput('store/simpleRecord.pec');
});

test('Interpreted SlicedRecords', () => {
	checkInterpretedOutput('store/slicedRecords.pec');
});

test('Transpiled SlicedRecords', () => {
	checkTranspiledOutput('store/slicedRecords.pec');
});

test('Interpreted SortedRecords', () => {
	checkInterpretedOutput('store/sortedRecords.pec');
});

test('Transpiled SortedRecords', () => {
	checkTranspiledOutput('store/sortedRecords.pec');
});

test('Interpreted SubRecord', () => {
	checkInterpretedOutput('store/subRecord.pec');
});

test('Transpiled SubRecord', () => {
	checkTranspiledOutput('store/subRecord.pec');
});

test('Interpreted UntypedRecord', () => {
	checkInterpretedOutput('store/untypedRecord.pec');
});

test('Transpiled UntypedRecord', () => {
	checkTranspiledOutput('store/untypedRecord.pec');
});

