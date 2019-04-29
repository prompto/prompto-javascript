var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted CodeValue', () => {
	checkInterpretedOutput('css/codeValue.pmc');
});

test('Transpiled CodeValue', () => {
	checkTranspiledOutput('css/codeValue.pmc');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('css/hyphenName.pmc');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('css/hyphenName.pmc');
});

test('Interpreted MultiValue', () => {
	checkInterpretedOutput('css/multiValue.pmc');
});

test('Transpiled MultiValue', () => {
	checkTranspiledOutput('css/multiValue.pmc');
});

test('Interpreted NumberValue', () => {
	checkInterpretedOutput('css/numberValue.pmc');
});

test('Transpiled NumberValue', () => {
	checkTranspiledOutput('css/numberValue.pmc');
});

test('Interpreted PixelValue', () => {
	checkInterpretedOutput('css/pixelValue.pmc');
});

test('Transpiled PixelValue', () => {
	checkTranspiledOutput('css/pixelValue.pmc');
});

test('Interpreted TextValue', () => {
	checkInterpretedOutput('css/textValue.pmc');
});

test('Transpiled TextValue', () => {
	checkTranspiledOutput('css/textValue.pmc');
});

