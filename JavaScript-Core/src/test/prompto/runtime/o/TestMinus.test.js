var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MinusDecimal', () => {
	checkInterpretedOutput('minus/minusDecimal.poc');
});

test('Transpiled MinusDecimal', () => {
	checkTranspiledOutput('minus/minusDecimal.poc');
});

test('Interpreted MinusInteger', () => {
	checkInterpretedOutput('minus/minusInteger.poc');
});

test('Transpiled MinusInteger', () => {
	checkTranspiledOutput('minus/minusInteger.poc');
});

test('Interpreted MinusPeriod', () => {
	checkInterpretedOutput('minus/minusPeriod.poc');
});

test('Transpiled MinusPeriod', () => {
	checkTranspiledOutput('minus/minusPeriod.poc');
});

