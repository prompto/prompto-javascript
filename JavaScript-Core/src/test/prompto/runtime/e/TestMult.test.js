var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MultCharacter', () => {
	checkInterpretedOutput('mult/multCharacter.pec');
});

test('Transpiled MultCharacter', () => {
	checkTranspiledOutput('mult/multCharacter.pec');
});

test('Interpreted MultDecimal', () => {
	checkInterpretedOutput('mult/multDecimal.pec');
});

test('Transpiled MultDecimal', () => {
	checkTranspiledOutput('mult/multDecimal.pec');
});

test('Interpreted MultInteger', () => {
	checkInterpretedOutput('mult/multInteger.pec');
});

test('Transpiled MultInteger', () => {
	checkTranspiledOutput('mult/multInteger.pec');
});

test('Interpreted MultList', () => {
	checkInterpretedOutput('mult/multList.pec');
});

test('Transpiled MultList', () => {
	checkTranspiledOutput('mult/multList.pec');
});

test('Interpreted MultPeriod', () => {
	checkInterpretedOutput('mult/multPeriod.pec');
});

test('Transpiled MultPeriod', () => {
	checkTranspiledOutput('mult/multPeriod.pec');
});

test('Interpreted MultText', () => {
	checkInterpretedOutput('mult/multText.pec');
});

test('Transpiled MultText', () => {
	checkTranspiledOutput('mult/multText.pec');
});

