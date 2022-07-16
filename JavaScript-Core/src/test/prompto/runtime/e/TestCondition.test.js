var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ComplexIf', () => {
	checkInterpretedOutput('condition/complexIf.pec');
});

test('Transpiled ComplexIf', () => {
	checkTranspiledOutput('condition/complexIf.pec');
});

test('Interpreted EmbeddedIf', () => {
	checkInterpretedOutput('condition/embeddedIf.pec');
});

test('Transpiled EmbeddedIf', () => {
	checkTranspiledOutput('condition/embeddedIf.pec');
});

test('Interpreted ReturnTextIf', () => {
	checkInterpretedOutput('condition/returnTextIf.pec');
});

test('Transpiled ReturnTextIf', () => {
	checkTranspiledOutput('condition/returnTextIf.pec');
});

test('Interpreted ReturnVoidIf', () => {
	checkInterpretedOutput('condition/returnVoidIf.pec');
});

test('Transpiled ReturnVoidIf', () => {
	checkTranspiledOutput('condition/returnVoidIf.pec');
});

test('Interpreted SimpleIf', () => {
	checkInterpretedOutput('condition/simpleIf.pec');
});

test('Transpiled SimpleIf', () => {
	checkTranspiledOutput('condition/simpleIf.pec');
});

test('Interpreted Switch', () => {
	checkInterpretedOutput('condition/switch.pec');
});

test('Transpiled Switch', () => {
	checkTranspiledOutput('condition/switch.pec');
});

test('Interpreted Ternary', () => {
	checkInterpretedOutput('condition/ternary.pec');
});

test('Transpiled Ternary', () => {
	checkTranspiledOutput('condition/ternary.pec');
});

