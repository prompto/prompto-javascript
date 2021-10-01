var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted CodeValue', () => {
	checkInterpretedOutput('css/codeValue.poc');
});

test('Transpiled CodeValue', () => {
	checkTranspiledOutput('css/codeValue.poc');
});

test('Interpreted CompositeValue', () => {
	checkInterpretedOutput('css/compositeValue.poc');
});

test('Transpiled CompositeValue', () => {
	checkTranspiledOutput('css/compositeValue.poc');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('css/hyphenName.poc');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('css/hyphenName.poc');
});

test('Interpreted MultiValue', () => {
	checkInterpretedOutput('css/multiValue.poc');
});

test('Transpiled MultiValue', () => {
	checkTranspiledOutput('css/multiValue.poc');
});

test('Interpreted NumberValue', () => {
	checkInterpretedOutput('css/numberValue.poc');
});

test('Transpiled NumberValue', () => {
	checkTranspiledOutput('css/numberValue.poc');
});

test('Interpreted PixelValue', () => {
	checkInterpretedOutput('css/pixelValue.poc');
});

test('Transpiled PixelValue', () => {
	checkTranspiledOutput('css/pixelValue.poc');
});

test('Interpreted TextValue', () => {
	checkInterpretedOutput('css/textValue.poc');
});

test('Transpiled TextValue', () => {
	checkTranspiledOutput('css/textValue.poc');
});

