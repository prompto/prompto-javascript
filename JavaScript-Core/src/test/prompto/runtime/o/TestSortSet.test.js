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
	checkInterpretedOutput('sortSet/sortBooleans.poc');
});

test('Transpiled SortBooleans', () => {
	checkTranspiledOutput('sortSet/sortBooleans.poc');
});

test('Interpreted SortDateTimes', () => {
	checkInterpretedOutput('sortSet/sortDateTimes.poc');
});

test('Transpiled SortDateTimes', () => {
	checkTranspiledOutput('sortSet/sortDateTimes.poc');
});

test('Interpreted SortDates', () => {
	checkInterpretedOutput('sortSet/sortDates.poc');
});

test('Transpiled SortDates', () => {
	checkTranspiledOutput('sortSet/sortDates.poc');
});

test('Interpreted SortDecimals', () => {
	checkInterpretedOutput('sortSet/sortDecimals.poc');
});

test('Transpiled SortDecimals', () => {
	checkTranspiledOutput('sortSet/sortDecimals.poc');
});

test('Interpreted SortDescBooleans', () => {
	checkInterpretedOutput('sortSet/sortDescBooleans.poc');
});

test('Transpiled SortDescBooleans', () => {
	checkTranspiledOutput('sortSet/sortDescBooleans.poc');
});

test('Interpreted SortDescDateTimes', () => {
	checkInterpretedOutput('sortSet/sortDescDateTimes.poc');
});

test('Transpiled SortDescDateTimes', () => {
	checkTranspiledOutput('sortSet/sortDescDateTimes.poc');
});

test('Interpreted SortDescDates', () => {
	checkInterpretedOutput('sortSet/sortDescDates.poc');
});

test('Transpiled SortDescDates', () => {
	checkTranspiledOutput('sortSet/sortDescDates.poc');
});

test('Interpreted SortDescDecimals', () => {
	checkInterpretedOutput('sortSet/sortDescDecimals.poc');
});

test('Transpiled SortDescDecimals', () => {
	checkTranspiledOutput('sortSet/sortDescDecimals.poc');
});

test('Interpreted SortDescExpressions', () => {
	checkInterpretedOutput('sortSet/sortDescExpressions.poc');
});

test('Transpiled SortDescExpressions', () => {
	checkTranspiledOutput('sortSet/sortDescExpressions.poc');
});

test('Interpreted SortDescIntegers', () => {
	checkInterpretedOutput('sortSet/sortDescIntegers.poc');
});

test('Transpiled SortDescIntegers', () => {
	checkTranspiledOutput('sortSet/sortDescIntegers.poc');
});

test('Interpreted SortDescKeys', () => {
	checkInterpretedOutput('sortSet/sortDescKeys.poc');
});

test('Transpiled SortDescKeys', () => {
	checkTranspiledOutput('sortSet/sortDescKeys.poc');
});

test('Interpreted SortDescMethods', () => {
	checkInterpretedOutput('sortSet/sortDescMethods.poc');
});

test('Transpiled SortDescMethods', () => {
	checkTranspiledOutput('sortSet/sortDescMethods.poc');
});

test('Interpreted SortDescNames', () => {
	checkInterpretedOutput('sortSet/sortDescNames.poc');
});

test('Transpiled SortDescNames', () => {
	checkTranspiledOutput('sortSet/sortDescNames.poc');
});

test('Interpreted SortDescTexts', () => {
	checkInterpretedOutput('sortSet/sortDescTexts.poc');
});

test('Transpiled SortDescTexts', () => {
	checkTranspiledOutput('sortSet/sortDescTexts.poc');
});

test('Interpreted SortDescTimes', () => {
	checkInterpretedOutput('sortSet/sortDescTimes.poc');
});

test('Transpiled SortDescTimes', () => {
	checkTranspiledOutput('sortSet/sortDescTimes.poc');
});

test('Interpreted SortExpressions', () => {
	checkInterpretedOutput('sortSet/sortExpressions.poc');
});

test('Transpiled SortExpressions', () => {
	checkTranspiledOutput('sortSet/sortExpressions.poc');
});

test('Interpreted SortIntegers', () => {
	checkInterpretedOutput('sortSet/sortIntegers.poc');
});

test('Transpiled SortIntegers', () => {
	checkTranspiledOutput('sortSet/sortIntegers.poc');
});

test('Interpreted SortKeys', () => {
	checkInterpretedOutput('sortSet/sortKeys.poc');
});

test('Transpiled SortKeys', () => {
	checkTranspiledOutput('sortSet/sortKeys.poc');
});

test('Interpreted SortMethods', () => {
	checkInterpretedOutput('sortSet/sortMethods.poc');
});

test('Transpiled SortMethods', () => {
	checkTranspiledOutput('sortSet/sortMethods.poc');
});

test('Interpreted SortNames', () => {
	checkInterpretedOutput('sortSet/sortNames.poc');
});

test('Transpiled SortNames', () => {
	checkTranspiledOutput('sortSet/sortNames.poc');
});

test('Interpreted SortTexts', () => {
	checkInterpretedOutput('sortSet/sortTexts.poc');
});

test('Transpiled SortTexts', () => {
	checkTranspiledOutput('sortSet/sortTexts.poc');
});

test('Interpreted SortTimes', () => {
	checkInterpretedOutput('sortSet/sortTimes.poc');
});

test('Transpiled SortTimes', () => {
	checkTranspiledOutput('sortSet/sortTimes.poc');
});

