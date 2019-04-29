var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SortBooleans', () => {
	checkInterpretedOutput('sortList/sortBooleans.pec');
});

test('Transpiled SortBooleans', () => {
	checkTranspiledOutput('sortList/sortBooleans.pec');
});

test('Interpreted SortDateTimes', () => {
	checkInterpretedOutput('sortList/sortDateTimes.pec');
});

test('Transpiled SortDateTimes', () => {
	checkTranspiledOutput('sortList/sortDateTimes.pec');
});

test('Interpreted SortDates', () => {
	checkInterpretedOutput('sortList/sortDates.pec');
});

test('Transpiled SortDates', () => {
	checkTranspiledOutput('sortList/sortDates.pec');
});

test('Interpreted SortDecimals', () => {
	checkInterpretedOutput('sortList/sortDecimals.pec');
});

test('Transpiled SortDecimals', () => {
	checkTranspiledOutput('sortList/sortDecimals.pec');
});

test('Interpreted SortDescBooleans', () => {
	checkInterpretedOutput('sortList/sortDescBooleans.pec');
});

test('Transpiled SortDescBooleans', () => {
	checkTranspiledOutput('sortList/sortDescBooleans.pec');
});

test('Interpreted SortDescDateTimes', () => {
	checkInterpretedOutput('sortList/sortDescDateTimes.pec');
});

test('Transpiled SortDescDateTimes', () => {
	checkTranspiledOutput('sortList/sortDescDateTimes.pec');
});

test('Interpreted SortDescDates', () => {
	checkInterpretedOutput('sortList/sortDescDates.pec');
});

test('Transpiled SortDescDates', () => {
	checkTranspiledOutput('sortList/sortDescDates.pec');
});

test('Interpreted SortDescDecimals', () => {
	checkInterpretedOutput('sortList/sortDescDecimals.pec');
});

test('Transpiled SortDescDecimals', () => {
	checkTranspiledOutput('sortList/sortDescDecimals.pec');
});

test('Interpreted SortDescExpressions', () => {
	checkInterpretedOutput('sortList/sortDescExpressions.pec');
});

test('Transpiled SortDescExpressions', () => {
	checkTranspiledOutput('sortList/sortDescExpressions.pec');
});

test('Interpreted SortDescIntegers', () => {
	checkInterpretedOutput('sortList/sortDescIntegers.pec');
});

test('Transpiled SortDescIntegers', () => {
	checkTranspiledOutput('sortList/sortDescIntegers.pec');
});

test('Interpreted SortDescKeys', () => {
	checkInterpretedOutput('sortList/sortDescKeys.pec');
});

test('Transpiled SortDescKeys', () => {
	checkTranspiledOutput('sortList/sortDescKeys.pec');
});

test('Interpreted SortDescMethods', () => {
	checkInterpretedOutput('sortList/sortDescMethods.pec');
});

test('Transpiled SortDescMethods', () => {
	checkTranspiledOutput('sortList/sortDescMethods.pec');
});

test('Interpreted SortDescNames', () => {
	checkInterpretedOutput('sortList/sortDescNames.pec');
});

test('Transpiled SortDescNames', () => {
	checkTranspiledOutput('sortList/sortDescNames.pec');
});

test('Interpreted SortDescTexts', () => {
	checkInterpretedOutput('sortList/sortDescTexts.pec');
});

test('Transpiled SortDescTexts', () => {
	checkTranspiledOutput('sortList/sortDescTexts.pec');
});

test('Interpreted SortDescTimes', () => {
	checkInterpretedOutput('sortList/sortDescTimes.pec');
});

test('Transpiled SortDescTimes', () => {
	checkTranspiledOutput('sortList/sortDescTimes.pec');
});

test('Interpreted SortDocumentExpressions', () => {
	checkInterpretedOutput('sortList/sortDocumentExpressions.pec');
});

test('Transpiled SortDocumentExpressions', () => {
	checkTranspiledOutput('sortList/sortDocumentExpressions.pec');
});

test('Interpreted SortDocumentKeys', () => {
	checkInterpretedOutput('sortList/sortDocumentKeys.pec');
});

test('Transpiled SortDocumentKeys', () => {
	checkTranspiledOutput('sortList/sortDocumentKeys.pec');
});

test('Interpreted SortDocumentMethods', () => {
	checkInterpretedOutput('sortList/sortDocumentMethods.pec');
});

test('Transpiled SortDocumentMethods', () => {
	checkTranspiledOutput('sortList/sortDocumentMethods.pec');
});

test('Interpreted SortDocumentNames', () => {
	checkInterpretedOutput('sortList/sortDocumentNames.pec');
});

test('Transpiled SortDocumentNames', () => {
	checkTranspiledOutput('sortList/sortDocumentNames.pec');
});

test('Interpreted SortExpressions', () => {
	checkInterpretedOutput('sortList/sortExpressions.pec');
});

test('Transpiled SortExpressions', () => {
	checkTranspiledOutput('sortList/sortExpressions.pec');
});

test('Interpreted SortIntegers', () => {
	checkInterpretedOutput('sortList/sortIntegers.pec');
});

test('Transpiled SortIntegers', () => {
	checkTranspiledOutput('sortList/sortIntegers.pec');
});

test('Interpreted SortKeys', () => {
	checkInterpretedOutput('sortList/sortKeys.pec');
});

test('Transpiled SortKeys', () => {
	checkTranspiledOutput('sortList/sortKeys.pec');
});

test('Interpreted SortMethods', () => {
	checkInterpretedOutput('sortList/sortMethods.pec');
});

test('Transpiled SortMethods', () => {
	checkTranspiledOutput('sortList/sortMethods.pec');
});

test('Interpreted SortNames', () => {
	checkInterpretedOutput('sortList/sortNames.pec');
});

test('Transpiled SortNames', () => {
	checkTranspiledOutput('sortList/sortNames.pec');
});

test('Interpreted SortTexts', () => {
	checkInterpretedOutput('sortList/sortTexts.pec');
});

test('Transpiled SortTexts', () => {
	checkTranspiledOutput('sortList/sortTexts.pec');
});

test('Interpreted SortTimes', () => {
	checkInterpretedOutput('sortList/sortTimes.pec');
});

test('Transpiled SortTimes', () => {
	checkTranspiledOutput('sortList/sortTimes.pec');
});

