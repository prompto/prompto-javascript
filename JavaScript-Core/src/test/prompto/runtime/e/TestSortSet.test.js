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
	checkInterpretedOutput('sortSet/sortBooleans.pec');
});

test('Transpiled SortBooleans', () => {
	checkTranspiledOutput('sortSet/sortBooleans.pec');
});

test('Interpreted SortDateTimes', () => {
	checkInterpretedOutput('sortSet/sortDateTimes.pec');
});

test('Transpiled SortDateTimes', () => {
	checkTranspiledOutput('sortSet/sortDateTimes.pec');
});

test('Interpreted SortDates', () => {
	checkInterpretedOutput('sortSet/sortDates.pec');
});

test('Transpiled SortDates', () => {
	checkTranspiledOutput('sortSet/sortDates.pec');
});

test('Interpreted SortDecimals', () => {
	checkInterpretedOutput('sortSet/sortDecimals.pec');
});

test('Transpiled SortDecimals', () => {
	checkTranspiledOutput('sortSet/sortDecimals.pec');
});

test('Interpreted SortDescBooleans', () => {
	checkInterpretedOutput('sortSet/sortDescBooleans.pec');
});

test('Transpiled SortDescBooleans', () => {
	checkTranspiledOutput('sortSet/sortDescBooleans.pec');
});

test('Interpreted SortDescDateTimes', () => {
	checkInterpretedOutput('sortSet/sortDescDateTimes.pec');
});

test('Transpiled SortDescDateTimes', () => {
	checkTranspiledOutput('sortSet/sortDescDateTimes.pec');
});

test('Interpreted SortDescDates', () => {
	checkInterpretedOutput('sortSet/sortDescDates.pec');
});

test('Transpiled SortDescDates', () => {
	checkTranspiledOutput('sortSet/sortDescDates.pec');
});

test('Interpreted SortDescDecimals', () => {
	checkInterpretedOutput('sortSet/sortDescDecimals.pec');
});

test('Transpiled SortDescDecimals', () => {
	checkTranspiledOutput('sortSet/sortDescDecimals.pec');
});

test('Interpreted SortDescExpressions', () => {
	checkInterpretedOutput('sortSet/sortDescExpressions.pec');
});

test('Transpiled SortDescExpressions', () => {
	checkTranspiledOutput('sortSet/sortDescExpressions.pec');
});

test('Interpreted SortDescIntegers', () => {
	checkInterpretedOutput('sortSet/sortDescIntegers.pec');
});

test('Transpiled SortDescIntegers', () => {
	checkTranspiledOutput('sortSet/sortDescIntegers.pec');
});

test('Interpreted SortDescKeys', () => {
	checkInterpretedOutput('sortSet/sortDescKeys.pec');
});

test('Transpiled SortDescKeys', () => {
	checkTranspiledOutput('sortSet/sortDescKeys.pec');
});

test('Interpreted SortDescMethods', () => {
	checkInterpretedOutput('sortSet/sortDescMethods.pec');
});

test('Transpiled SortDescMethods', () => {
	checkTranspiledOutput('sortSet/sortDescMethods.pec');
});

test('Interpreted SortDescNames', () => {
	checkInterpretedOutput('sortSet/sortDescNames.pec');
});

test('Transpiled SortDescNames', () => {
	checkTranspiledOutput('sortSet/sortDescNames.pec');
});

test('Interpreted SortDescTexts', () => {
	checkInterpretedOutput('sortSet/sortDescTexts.pec');
});

test('Transpiled SortDescTexts', () => {
	checkTranspiledOutput('sortSet/sortDescTexts.pec');
});

test('Interpreted SortDescTimes', () => {
	checkInterpretedOutput('sortSet/sortDescTimes.pec');
});

test('Transpiled SortDescTimes', () => {
	checkTranspiledOutput('sortSet/sortDescTimes.pec');
});

test('Interpreted SortExpressions', () => {
	checkInterpretedOutput('sortSet/sortExpressions.pec');
});

test('Transpiled SortExpressions', () => {
	checkTranspiledOutput('sortSet/sortExpressions.pec');
});

test('Interpreted SortIntegers', () => {
	checkInterpretedOutput('sortSet/sortIntegers.pec');
});

test('Transpiled SortIntegers', () => {
	checkTranspiledOutput('sortSet/sortIntegers.pec');
});

test('Interpreted SortKeys', () => {
	checkInterpretedOutput('sortSet/sortKeys.pec');
});

test('Transpiled SortKeys', () => {
	checkTranspiledOutput('sortSet/sortKeys.pec');
});

test('Interpreted SortMethods', () => {
	checkInterpretedOutput('sortSet/sortMethods.pec');
});

test('Transpiled SortMethods', () => {
	checkTranspiledOutput('sortSet/sortMethods.pec');
});

test('Interpreted SortNames', () => {
	checkInterpretedOutput('sortSet/sortNames.pec');
});

test('Transpiled SortNames', () => {
	checkTranspiledOutput('sortSet/sortNames.pec');
});

test('Interpreted SortTexts', () => {
	checkInterpretedOutput('sortSet/sortTexts.pec');
});

test('Transpiled SortTexts', () => {
	checkTranspiledOutput('sortSet/sortTexts.pec');
});

test('Interpreted SortTimes', () => {
	checkInterpretedOutput('sortSet/sortTimes.pec');
});

test('Transpiled SortTimes', () => {
	checkTranspiledOutput('sortSet/sortTimes.pec');
});

