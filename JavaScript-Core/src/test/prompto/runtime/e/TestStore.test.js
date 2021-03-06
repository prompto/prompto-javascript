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

test('Interpreted AsyncFetchOne', () => {
	checkInterpretedOutput('store/asyncFetchOne.pec');
});

test('Transpiled AsyncFetchOne', () => {
	checkTranspiledOutput('store/asyncFetchOne.pec');
});

test('Interpreted AsyncStore', () => {
	checkInterpretedOutput('store/asyncStore.pec');
});

test('Transpiled AsyncStore', () => {
	checkTranspiledOutput('store/asyncStore.pec');
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

