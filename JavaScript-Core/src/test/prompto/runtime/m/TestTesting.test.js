var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted And', () => {
	checkInterpretedOutput('testing/and.pmc');
});

test('Transpiled And', () => {
	checkTranspiledOutput('testing/and.pmc');
});

test('Interpreted Contains', () => {
	checkInterpretedOutput('testing/contains.pmc');
});

test('Transpiled Contains', () => {
	checkTranspiledOutput('testing/contains.pmc');
});

test('Interpreted Greater', () => {
	checkInterpretedOutput('testing/greater.pmc');
});

test('Transpiled Greater', () => {
	checkTranspiledOutput('testing/greater.pmc');
});

test('Interpreted Method', () => {
	checkInterpretedOutput('testing/method.pmc');
});

test('Transpiled Method', () => {
	checkTranspiledOutput('testing/method.pmc');
});

test('Interpreted Negative', () => {
	checkInterpretedOutput('testing/negative.pmc');
});

test('Transpiled Negative', () => {
	checkTranspiledOutput('testing/negative.pmc');
});

test('Interpreted NegativeError', () => {
	checkInterpretedOutput('testing/negativeError.pmc');
});

test('Transpiled NegativeError', () => {
	checkTranspiledOutput('testing/negativeError.pmc');
});

test('Interpreted Not', () => {
	checkInterpretedOutput('testing/not.pmc');
});

test('Transpiled Not', () => {
	checkTranspiledOutput('testing/not.pmc');
});

test('Interpreted Or', () => {
	checkInterpretedOutput('testing/or.pmc');
});

test('Transpiled Or', () => {
	checkTranspiledOutput('testing/or.pmc');
});

test('Interpreted Positive', () => {
	checkInterpretedOutput('testing/positive.pmc');
});

test('Transpiled Positive', () => {
	checkTranspiledOutput('testing/positive.pmc');
});

test('Interpreted PositiveError', () => {
	checkInterpretedOutput('testing/positiveError.pmc');
});

test('Transpiled PositiveError', () => {
	checkTranspiledOutput('testing/positiveError.pmc');
});

