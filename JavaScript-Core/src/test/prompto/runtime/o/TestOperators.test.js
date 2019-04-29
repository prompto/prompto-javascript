var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AddAmount', () => {
	checkInterpretedOutput('operators/addAmount.poc');
});

test('Transpiled AddAmount', () => {
	checkTranspiledOutput('operators/addAmount.poc');
});

test('Interpreted DivAmount', () => {
	checkInterpretedOutput('operators/divAmount.poc');
});

test('Transpiled DivAmount', () => {
	checkTranspiledOutput('operators/divAmount.poc');
});

test('Interpreted IdivAmount', () => {
	checkInterpretedOutput('operators/idivAmount.poc');
});

test('Transpiled IdivAmount', () => {
	checkTranspiledOutput('operators/idivAmount.poc');
});

test('Interpreted ModAmount', () => {
	checkInterpretedOutput('operators/modAmount.poc');
});

test('Transpiled ModAmount', () => {
	checkTranspiledOutput('operators/modAmount.poc');
});

test('Interpreted MultAmount', () => {
	checkInterpretedOutput('operators/multAmount.poc');
});

test('Transpiled MultAmount', () => {
	checkTranspiledOutput('operators/multAmount.poc');
});

test('Interpreted SubAmount', () => {
	checkInterpretedOutput('operators/subAmount.poc');
});

test('Transpiled SubAmount', () => {
	checkTranspiledOutput('operators/subAmount.poc');
});

