var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ComplexIf', () => {
	checkInterpretedOutput('condition/complexIf.poc');
});

test('Transpiled ComplexIf', () => {
	checkTranspiledOutput('condition/complexIf.poc');
});

test('Interpreted EmbeddedIf', () => {
	checkInterpretedOutput('condition/embeddedIf.poc');
});

test('Transpiled EmbeddedIf', () => {
	checkTranspiledOutput('condition/embeddedIf.poc');
});

test('Interpreted LocalScope', () => {
	checkInterpretedOutput('condition/localScope.poc');
});

test('Transpiled LocalScope', () => {
	checkTranspiledOutput('condition/localScope.poc');
});

test('Interpreted ReturnIf', () => {
	checkInterpretedOutput('condition/returnIf.poc');
});

test('Transpiled ReturnIf', () => {
	checkTranspiledOutput('condition/returnIf.poc');
});

test('Interpreted SimpleIf', () => {
	checkInterpretedOutput('condition/simpleIf.poc');
});

test('Transpiled SimpleIf', () => {
	checkTranspiledOutput('condition/simpleIf.poc');
});

test('Interpreted Switch', () => {
	checkInterpretedOutput('condition/switch.poc');
});

test('Transpiled Switch', () => {
	checkTranspiledOutput('condition/switch.poc');
});

test('Interpreted Ternary', () => {
	checkInterpretedOutput('condition/ternary.poc');
});

test('Transpiled Ternary', () => {
	checkTranspiledOutput('condition/ternary.poc');
});

test('Interpreted TernaryType', () => {
	checkInterpretedOutput('condition/ternaryType.poc');
});

test('Transpiled TernaryType', () => {
	checkTranspiledOutput('condition/ternaryType.poc');
});

