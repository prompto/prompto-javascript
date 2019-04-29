var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SortBooleans', () => {
	checkInterpretedOutput('sortList/sortBooleans.poc');
});

test('Transpiled SortBooleans', () => {
	checkTranspiledOutput('sortList/sortBooleans.poc');
});

test('Interpreted SortDateTimes', () => {
	checkInterpretedOutput('sortList/sortDateTimes.poc');
});

test('Transpiled SortDateTimes', () => {
	checkTranspiledOutput('sortList/sortDateTimes.poc');
});

test('Interpreted SortDates', () => {
	checkInterpretedOutput('sortList/sortDates.poc');
});

test('Transpiled SortDates', () => {
	checkTranspiledOutput('sortList/sortDates.poc');
});

test('Interpreted SortDecimals', () => {
	checkInterpretedOutput('sortList/sortDecimals.poc');
});

test('Transpiled SortDecimals', () => {
	checkTranspiledOutput('sortList/sortDecimals.poc');
});

test('Interpreted SortDescBooleans', () => {
	checkInterpretedOutput('sortList/sortDescBooleans.poc');
});

test('Transpiled SortDescBooleans', () => {
	checkTranspiledOutput('sortList/sortDescBooleans.poc');
});

test('Interpreted SortDescDateTimes', () => {
	checkInterpretedOutput('sortList/sortDescDateTimes.poc');
});

test('Transpiled SortDescDateTimes', () => {
	checkTranspiledOutput('sortList/sortDescDateTimes.poc');
});

test('Interpreted SortDescDates', () => {
	checkInterpretedOutput('sortList/sortDescDates.poc');
});

test('Transpiled SortDescDates', () => {
	checkTranspiledOutput('sortList/sortDescDates.poc');
});

test('Interpreted SortDescDecimals', () => {
	checkInterpretedOutput('sortList/sortDescDecimals.poc');
});

test('Transpiled SortDescDecimals', () => {
	checkTranspiledOutput('sortList/sortDescDecimals.poc');
});

test('Interpreted SortDescExpressions', () => {
	checkInterpretedOutput('sortList/sortDescExpressions.poc');
});

test('Transpiled SortDescExpressions', () => {
	checkTranspiledOutput('sortList/sortDescExpressions.poc');
});

test('Interpreted SortDescIntegers', () => {
	checkInterpretedOutput('sortList/sortDescIntegers.poc');
});

test('Transpiled SortDescIntegers', () => {
	checkTranspiledOutput('sortList/sortDescIntegers.poc');
});

test('Interpreted SortDescKeys', () => {
	checkInterpretedOutput('sortList/sortDescKeys.poc');
});

test('Transpiled SortDescKeys', () => {
	checkTranspiledOutput('sortList/sortDescKeys.poc');
});

test('Interpreted SortDescMethods', () => {
	checkInterpretedOutput('sortList/sortDescMethods.poc');
});

test('Transpiled SortDescMethods', () => {
	checkTranspiledOutput('sortList/sortDescMethods.poc');
});

test('Interpreted SortDescNames', () => {
	checkInterpretedOutput('sortList/sortDescNames.poc');
});

test('Transpiled SortDescNames', () => {
	checkTranspiledOutput('sortList/sortDescNames.poc');
});

test('Interpreted SortDescTexts', () => {
	checkInterpretedOutput('sortList/sortDescTexts.poc');
});

test('Transpiled SortDescTexts', () => {
	checkTranspiledOutput('sortList/sortDescTexts.poc');
});

test('Interpreted SortDescTimes', () => {
	checkInterpretedOutput('sortList/sortDescTimes.poc');
});

test('Transpiled SortDescTimes', () => {
	checkTranspiledOutput('sortList/sortDescTimes.poc');
});

test('Interpreted SortDocumentExpressions', () => {
	checkInterpretedOutput('sortList/sortDocumentExpressions.poc');
});

test('Transpiled SortDocumentExpressions', () => {
	checkTranspiledOutput('sortList/sortDocumentExpressions.poc');
});

test('Interpreted SortDocumentKeys', () => {
	checkInterpretedOutput('sortList/sortDocumentKeys.poc');
});

test('Transpiled SortDocumentKeys', () => {
	checkTranspiledOutput('sortList/sortDocumentKeys.poc');
});

test('Interpreted SortDocumentMethods', () => {
	checkInterpretedOutput('sortList/sortDocumentMethods.poc');
});

test('Transpiled SortDocumentMethods', () => {
	checkTranspiledOutput('sortList/sortDocumentMethods.poc');
});

test('Interpreted SortDocumentNames', () => {
	checkInterpretedOutput('sortList/sortDocumentNames.poc');
});

test('Transpiled SortDocumentNames', () => {
	checkTranspiledOutput('sortList/sortDocumentNames.poc');
});

test('Interpreted SortExpressions', () => {
	checkInterpretedOutput('sortList/sortExpressions.poc');
});

test('Transpiled SortExpressions', () => {
	checkTranspiledOutput('sortList/sortExpressions.poc');
});

test('Interpreted SortIntegers', () => {
	checkInterpretedOutput('sortList/sortIntegers.poc');
});

test('Transpiled SortIntegers', () => {
	checkTranspiledOutput('sortList/sortIntegers.poc');
});

test('Interpreted SortKeys', () => {
	checkInterpretedOutput('sortList/sortKeys.poc');
});

test('Transpiled SortKeys', () => {
	checkTranspiledOutput('sortList/sortKeys.poc');
});

test('Interpreted SortMethods', () => {
	checkInterpretedOutput('sortList/sortMethods.poc');
});

test('Transpiled SortMethods', () => {
	checkTranspiledOutput('sortList/sortMethods.poc');
});

test('Interpreted SortNames', () => {
	checkInterpretedOutput('sortList/sortNames.poc');
});

test('Transpiled SortNames', () => {
	checkTranspiledOutput('sortList/sortNames.poc');
});

test('Interpreted SortTexts', () => {
	checkInterpretedOutput('sortList/sortTexts.poc');
});

test('Transpiled SortTexts', () => {
	checkTranspiledOutput('sortList/sortTexts.poc');
});

test('Interpreted SortTimes', () => {
	checkInterpretedOutput('sortList/sortTimes.poc');
});

test('Transpiled SortTimes', () => {
	checkTranspiledOutput('sortList/sortTimes.poc');
});

