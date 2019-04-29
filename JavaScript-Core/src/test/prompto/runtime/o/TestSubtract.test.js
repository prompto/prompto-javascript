var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SubDate', () => {
	checkInterpretedOutput('subtract/subDate.poc');
});

test('Transpiled SubDate', () => {
	checkTranspiledOutput('subtract/subDate.poc');
});

test('Interpreted SubDateTime', () => {
	checkInterpretedOutput('subtract/subDateTime.poc');
});

test('Transpiled SubDateTime', () => {
	checkTranspiledOutput('subtract/subDateTime.poc');
});

test('Interpreted SubDecimal', () => {
	checkInterpretedOutput('subtract/subDecimal.poc');
});

test('Transpiled SubDecimal', () => {
	checkTranspiledOutput('subtract/subDecimal.poc');
});

test('Interpreted SubInteger', () => {
	checkInterpretedOutput('subtract/subInteger.poc');
});

test('Transpiled SubInteger', () => {
	checkTranspiledOutput('subtract/subInteger.poc');
});

test('Interpreted SubList', () => {
	checkInterpretedOutput('subtract/subList.poc');
});

test('Transpiled SubList', () => {
	checkTranspiledOutput('subtract/subList.poc');
});

test('Interpreted SubPeriod', () => {
	checkInterpretedOutput('subtract/subPeriod.poc');
});

test('Transpiled SubPeriod', () => {
	checkTranspiledOutput('subtract/subPeriod.poc');
});

test('Interpreted SubSet', () => {
	checkInterpretedOutput('subtract/subSet.poc');
});

test('Transpiled SubSet', () => {
	checkTranspiledOutput('subtract/subSet.poc');
});

test('Interpreted SubTime', () => {
	checkInterpretedOutput('subtract/subTime.poc');
});

test('Transpiled SubTime', () => {
	checkTranspiledOutput('subtract/subTime.poc');
});

