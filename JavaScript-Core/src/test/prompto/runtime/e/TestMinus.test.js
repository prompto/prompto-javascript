var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MinusDecimal', () => {
	checkInterpretedOutput('minus/minusDecimal.pec');
});

test('Transpiled MinusDecimal', () => {
	checkTranspiledOutput('minus/minusDecimal.pec');
});

test('Interpreted MinusInteger', () => {
	checkInterpretedOutput('minus/minusInteger.pec');
});

test('Transpiled MinusInteger', () => {
	checkTranspiledOutput('minus/minusInteger.pec');
});

test('Interpreted MinusPeriod', () => {
	checkInterpretedOutput('minus/minusPeriod.pec');
});

test('Transpiled MinusPeriod', () => {
	checkTranspiledOutput('minus/minusPeriod.pec');
});

