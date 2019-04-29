var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted And', () => {
	checkInterpretedOutput('testing/and.poc');
});

test('Transpiled And', () => {
	checkTranspiledOutput('testing/and.poc');
});

test('Interpreted Contains', () => {
	checkInterpretedOutput('testing/contains.poc');
});

test('Transpiled Contains', () => {
	checkTranspiledOutput('testing/contains.poc');
});

test('Interpreted Greater', () => {
	checkInterpretedOutput('testing/greater.poc');
});

test('Transpiled Greater', () => {
	checkTranspiledOutput('testing/greater.poc');
});

test('Interpreted Method', () => {
	checkInterpretedOutput('testing/method.poc');
});

test('Transpiled Method', () => {
	checkTranspiledOutput('testing/method.poc');
});

test('Interpreted Negative', () => {
	checkInterpretedOutput('testing/negative.poc');
});

test('Transpiled Negative', () => {
	checkTranspiledOutput('testing/negative.poc');
});

test('Interpreted NegativeError', () => {
	checkInterpretedOutput('testing/negativeError.poc');
});

test('Transpiled NegativeError', () => {
	checkTranspiledOutput('testing/negativeError.poc');
});

test('Interpreted Not', () => {
	checkInterpretedOutput('testing/not.poc');
});

test('Transpiled Not', () => {
	checkTranspiledOutput('testing/not.poc');
});

test('Interpreted Or', () => {
	checkInterpretedOutput('testing/or.poc');
});

test('Transpiled Or', () => {
	checkTranspiledOutput('testing/or.poc');
});

test('Interpreted Positive', () => {
	checkInterpretedOutput('testing/positive.poc');
});

test('Transpiled Positive', () => {
	checkTranspiledOutput('testing/positive.poc');
});

test('Interpreted PositiveError', () => {
	checkInterpretedOutput('testing/positiveError.poc');
});

test('Transpiled PositiveError', () => {
	checkTranspiledOutput('testing/positiveError.poc');
});

