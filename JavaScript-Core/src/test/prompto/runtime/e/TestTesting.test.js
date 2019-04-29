var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted And', () => {
	checkInterpretedOutput('testing/and.pec');
});

test('Transpiled And', () => {
	checkTranspiledOutput('testing/and.pec');
});

test('Interpreted Contains', () => {
	checkInterpretedOutput('testing/contains.pec');
});

test('Transpiled Contains', () => {
	checkTranspiledOutput('testing/contains.pec');
});

test('Interpreted Greater', () => {
	checkInterpretedOutput('testing/greater.pec');
});

test('Transpiled Greater', () => {
	checkTranspiledOutput('testing/greater.pec');
});

test('Interpreted Method', () => {
	checkInterpretedOutput('testing/method.pec');
});

test('Transpiled Method', () => {
	checkTranspiledOutput('testing/method.pec');
});

test('Interpreted Negative', () => {
	checkInterpretedOutput('testing/negative.pec');
});

test('Transpiled Negative', () => {
	checkTranspiledOutput('testing/negative.pec');
});

test('Interpreted NegativeError', () => {
	checkInterpretedOutput('testing/negativeError.pec');
});

test('Transpiled NegativeError', () => {
	checkTranspiledOutput('testing/negativeError.pec');
});

test('Interpreted Not', () => {
	checkInterpretedOutput('testing/not.pec');
});

test('Transpiled Not', () => {
	checkTranspiledOutput('testing/not.pec');
});

test('Interpreted Or', () => {
	checkInterpretedOutput('testing/or.pec');
});

test('Transpiled Or', () => {
	checkTranspiledOutput('testing/or.pec');
});

test('Interpreted Positive', () => {
	checkInterpretedOutput('testing/positive.pec');
});

test('Transpiled Positive', () => {
	checkTranspiledOutput('testing/positive.pec');
});

test('Interpreted PositiveError', () => {
	checkInterpretedOutput('testing/positiveError.pec');
});

test('Transpiled PositiveError', () => {
	checkTranspiledOutput('testing/positiveError.pec');
});

