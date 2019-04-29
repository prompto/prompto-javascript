var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MultCharacter', () => {
	checkInterpretedOutput('mult/multCharacter.poc');
});

test('Transpiled MultCharacter', () => {
	checkTranspiledOutput('mult/multCharacter.poc');
});

test('Interpreted MultDecimal', () => {
	checkInterpretedOutput('mult/multDecimal.poc');
});

test('Transpiled MultDecimal', () => {
	checkTranspiledOutput('mult/multDecimal.poc');
});

test('Interpreted MultInteger', () => {
	checkInterpretedOutput('mult/multInteger.poc');
});

test('Transpiled MultInteger', () => {
	checkTranspiledOutput('mult/multInteger.poc');
});

test('Interpreted MultList', () => {
	checkInterpretedOutput('mult/multList.poc');
});

test('Transpiled MultList', () => {
	checkTranspiledOutput('mult/multList.poc');
});

test('Interpreted MultPeriod', () => {
	checkInterpretedOutput('mult/multPeriod.poc');
});

test('Transpiled MultPeriod', () => {
	checkTranspiledOutput('mult/multPeriod.poc');
});

test('Interpreted MultText', () => {
	checkInterpretedOutput('mult/multText.poc');
});

test('Transpiled MultText', () => {
	checkTranspiledOutput('mult/multText.poc');
});

