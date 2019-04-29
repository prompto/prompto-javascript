var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AddAmount', () => {
	checkInterpretedOutput('operators/addAmount.pec');
});

test('Transpiled AddAmount', () => {
	checkTranspiledOutput('operators/addAmount.pec');
});

test('Interpreted DivAmount', () => {
	checkInterpretedOutput('operators/divAmount.pec');
});

test('Transpiled DivAmount', () => {
	checkTranspiledOutput('operators/divAmount.pec');
});

test('Interpreted IdivAmount', () => {
	checkInterpretedOutput('operators/idivAmount.pec');
});

test('Transpiled IdivAmount', () => {
	checkTranspiledOutput('operators/idivAmount.pec');
});

test('Interpreted ModAmount', () => {
	checkInterpretedOutput('operators/modAmount.pec');
});

test('Transpiled ModAmount', () => {
	checkTranspiledOutput('operators/modAmount.pec');
});

test('Interpreted MultAmount', () => {
	checkInterpretedOutput('operators/multAmount.pec');
});

test('Transpiled MultAmount', () => {
	checkTranspiledOutput('operators/multAmount.pec');
});

test('Interpreted SubAmount', () => {
	checkInterpretedOutput('operators/subAmount.pec');
});

test('Transpiled SubAmount', () => {
	checkTranspiledOutput('operators/subAmount.pec');
});

