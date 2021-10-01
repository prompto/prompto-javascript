var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted CodeValue', () => {
	checkInterpretedOutput('css/codeValue.pec');
});

test('Transpiled CodeValue', () => {
	checkTranspiledOutput('css/codeValue.pec');
});

test('Interpreted CompositeValue', () => {
	checkInterpretedOutput('css/compositeValue.pec');
});

test('Transpiled CompositeValue', () => {
	checkTranspiledOutput('css/compositeValue.pec');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('css/hyphenName.pec');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('css/hyphenName.pec');
});

test('Interpreted MultiValue', () => {
	checkInterpretedOutput('css/multiValue.pec');
});

test('Transpiled MultiValue', () => {
	checkTranspiledOutput('css/multiValue.pec');
});

test('Interpreted NumberValue', () => {
	checkInterpretedOutput('css/numberValue.pec');
});

test('Transpiled NumberValue', () => {
	checkTranspiledOutput('css/numberValue.pec');
});

test('Interpreted PixelValue', () => {
	checkInterpretedOutput('css/pixelValue.pec');
});

test('Transpiled PixelValue', () => {
	checkTranspiledOutput('css/pixelValue.pec');
});

test('Interpreted TextValue', () => {
	checkInterpretedOutput('css/textValue.pec');
});

test('Transpiled TextValue', () => {
	checkTranspiledOutput('css/textValue.pec');
});

