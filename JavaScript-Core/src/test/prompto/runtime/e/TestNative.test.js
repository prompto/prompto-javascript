var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AnyId', () => {
	checkInterpretedOutput('native/anyId.pec');
});

test('Transpiled AnyId', () => {
	checkTranspiledOutput('native/anyId.pec');
});

test('Interpreted AnyText', () => {
	checkInterpretedOutput('native/anyText.pec');
});

test('Transpiled AnyText', () => {
	checkTranspiledOutput('native/anyText.pec');
});

test('Interpreted Attribute', () => {
	checkInterpretedOutput('native/attribute.pec');
});

test('Transpiled Attribute', () => {
	checkTranspiledOutput('native/attribute.pec');
});

test('Interpreted Category', () => {
	checkInterpretedOutput('native/category.pec');
});

test('Transpiled Category', () => {
	checkTranspiledOutput('native/category.pec');
});

test('Interpreted CategoryReturn', () => {
	checkInterpretedOutput('native/categoryReturn.pec');
});

test('Transpiled CategoryReturn', () => {
	checkTranspiledOutput('native/categoryReturn.pec');
});

test('Interpreted Method', () => {
	checkInterpretedOutput('native/method.pec');
});

test('Transpiled Method', () => {
	checkTranspiledOutput('native/method.pec');
});

test('Interpreted Now', () => {
	checkInterpretedOutput('native/now.pec');
});

test('Transpiled Now', () => {
	checkTranspiledOutput('native/now.pec');
});

test('Interpreted Printer', () => {
	checkInterpretedOutput('native/printer.pec');
});

test('Transpiled Printer', () => {
	checkTranspiledOutput('native/printer.pec');
});

