var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DivDecimal', () => {
	checkInterpretedOutput('div/divDecimal.poc');
});

test('Transpiled DivDecimal', () => {
	checkTranspiledOutput('div/divDecimal.poc');
});

test('Interpreted DivInteger', () => {
	checkInterpretedOutput('div/divInteger.poc');
});

test('Transpiled DivInteger', () => {
	checkTranspiledOutput('div/divInteger.poc');
});

test('Interpreted IdivInteger', () => {
	checkInterpretedOutput('div/idivInteger.poc');
});

test('Transpiled IdivInteger', () => {
	checkTranspiledOutput('div/idivInteger.poc');
});

test('Interpreted ModInteger', () => {
	checkInterpretedOutput('div/modInteger.poc');
});

test('Transpiled ModInteger', () => {
	checkTranspiledOutput('div/modInteger.poc');
});

