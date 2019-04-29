var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SubDate', () => {
	checkInterpretedOutput('subtract/subDate.pec');
});

test('Transpiled SubDate', () => {
	checkTranspiledOutput('subtract/subDate.pec');
});

test('Interpreted SubDateTime', () => {
	checkInterpretedOutput('subtract/subDateTime.pec');
});

test('Transpiled SubDateTime', () => {
	checkTranspiledOutput('subtract/subDateTime.pec');
});

test('Interpreted SubDecimal', () => {
	checkInterpretedOutput('subtract/subDecimal.pec');
});

test('Transpiled SubDecimal', () => {
	checkTranspiledOutput('subtract/subDecimal.pec');
});

test('Interpreted SubDecimalEnum', () => {
	checkInterpretedOutput('subtract/subDecimalEnum.pec');
});

test('Transpiled SubDecimalEnum', () => {
	checkTranspiledOutput('subtract/subDecimalEnum.pec');
});

test('Interpreted SubInteger', () => {
	checkInterpretedOutput('subtract/subInteger.pec');
});

test('Transpiled SubInteger', () => {
	checkTranspiledOutput('subtract/subInteger.pec');
});

test('Interpreted SubIntegerEnum', () => {
	checkInterpretedOutput('subtract/subIntegerEnum.pec');
});

test('Transpiled SubIntegerEnum', () => {
	checkTranspiledOutput('subtract/subIntegerEnum.pec');
});

test('Interpreted SubList', () => {
	checkInterpretedOutput('subtract/subList.pec');
});

test('Transpiled SubList', () => {
	checkTranspiledOutput('subtract/subList.pec');
});

test('Interpreted SubPeriod', () => {
	checkInterpretedOutput('subtract/subPeriod.pec');
});

test('Transpiled SubPeriod', () => {
	checkTranspiledOutput('subtract/subPeriod.pec');
});

test('Interpreted SubSet', () => {
	checkInterpretedOutput('subtract/subSet.pec');
});

test('Transpiled SubSet', () => {
	checkTranspiledOutput('subtract/subSet.pec');
});

test('Interpreted SubTime', () => {
	checkInterpretedOutput('subtract/subTime.pec');
});

test('Transpiled SubTime', () => {
	checkTranspiledOutput('subtract/subTime.pec');
});

