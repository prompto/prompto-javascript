var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ChildElement', () => {
	checkInterpretedOutput('jsx/childElement.pec');
});

test('Transpiled ChildElement', () => {
	checkTranspiledOutput('jsx/childElement.pec');
});

test('Interpreted CodeAttribute', () => {
	checkInterpretedOutput('jsx/codeAttribute.pec');
});

test('Transpiled CodeAttribute', () => {
	checkTranspiledOutput('jsx/codeAttribute.pec');
});

test('Interpreted CodeElement', () => {
	checkInterpretedOutput('jsx/codeElement.pec');
});

test('Transpiled CodeElement', () => {
	checkTranspiledOutput('jsx/codeElement.pec');
});

test('Interpreted DotName', () => {
	checkInterpretedOutput('jsx/dotName.pec');
});

test('Transpiled DotName', () => {
	checkTranspiledOutput('jsx/dotName.pec');
});

test('Interpreted EmptyAttribute', () => {
	checkInterpretedOutput('jsx/emptyAttribute.pec');
});

test('Transpiled EmptyAttribute', () => {
	checkTranspiledOutput('jsx/emptyAttribute.pec');
});

test('Interpreted Fragment', () => {
	checkInterpretedOutput('jsx/fragment.pec');
});

test('Transpiled Fragment', () => {
	checkTranspiledOutput('jsx/fragment.pec');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('jsx/hyphenName.pec');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('jsx/hyphenName.pec');
});

test('Interpreted LiteralAttribute', () => {
	checkInterpretedOutput('jsx/literalAttribute.pec');
});

test('Transpiled LiteralAttribute', () => {
	checkTranspiledOutput('jsx/literalAttribute.pec');
});

test('Interpreted NonAsciiTextElement', () => {
	checkInterpretedOutput('jsx/nonAsciiTextElement.pec');
});

test('Transpiled NonAsciiTextElement', () => {
	checkTranspiledOutput('jsx/nonAsciiTextElement.pec');
});

test('Interpreted SelfClosingDiv', () => {
	checkInterpretedOutput('jsx/selfClosingDiv.pec');
});

test('Transpiled SelfClosingDiv', () => {
	checkTranspiledOutput('jsx/selfClosingDiv.pec');
});

test('Interpreted SelfClosingEmptyAttribute', () => {
	checkInterpretedOutput('jsx/selfClosingEmptyAttribute.pec');
});

test('Transpiled SelfClosingEmptyAttribute', () => {
	checkTranspiledOutput('jsx/selfClosingEmptyAttribute.pec');
});

test('Interpreted TextElement', () => {
	checkInterpretedOutput('jsx/textElement.pec');
});

test('Transpiled TextElement', () => {
	checkTranspiledOutput('jsx/textElement.pec');
});

