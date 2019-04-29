var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DivDecimal', () => {
	checkInterpretedOutput('div/divDecimal.pec');
});

test('Transpiled DivDecimal', () => {
	checkTranspiledOutput('div/divDecimal.pec');
});

test('Interpreted DivInteger', () => {
	checkInterpretedOutput('div/divInteger.pec');
});

test('Transpiled DivInteger', () => {
	checkTranspiledOutput('div/divInteger.pec');
});

test('Interpreted IdivInteger', () => {
	checkInterpretedOutput('div/idivInteger.pec');
});

test('Transpiled IdivInteger', () => {
	checkTranspiledOutput('div/idivInteger.pec');
});

test('Interpreted ModInteger', () => {
	checkInterpretedOutput('div/modInteger.pec');
});

test('Transpiled ModInteger', () => {
	checkTranspiledOutput('div/modInteger.pec');
});

