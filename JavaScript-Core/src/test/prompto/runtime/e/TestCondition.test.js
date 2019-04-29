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

test('Interpreted ReturnIf', () => {
	checkInterpretedOutput('condition/returnIf.pec');
});

test('Transpiled ReturnIf', () => {
	checkTranspiledOutput('condition/returnIf.pec');
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

