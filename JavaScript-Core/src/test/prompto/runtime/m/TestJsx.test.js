var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ChildElement', () => {
	checkInterpretedOutput('jsx/childElement.pmc');
});

test('Transpiled ChildElement', () => {
	checkTranspiledOutput('jsx/childElement.pmc');
});

test('Interpreted CodeAttribute', () => {
	checkInterpretedOutput('jsx/codeAttribute.pmc');
});

test('Transpiled CodeAttribute', () => {
	checkTranspiledOutput('jsx/codeAttribute.pmc');
});

test('Interpreted CodeElement', () => {
	checkInterpretedOutput('jsx/codeElement.pmc');
});

test('Transpiled CodeElement', () => {
	checkTranspiledOutput('jsx/codeElement.pmc');
});

test('Interpreted DotName', () => {
	checkInterpretedOutput('jsx/dotName.pmc');
});

test('Transpiled DotName', () => {
	checkTranspiledOutput('jsx/dotName.pmc');
});

test('Interpreted EmptyAttribute', () => {
	checkInterpretedOutput('jsx/emptyAttribute.pmc');
});

test('Transpiled EmptyAttribute', () => {
	checkTranspiledOutput('jsx/emptyAttribute.pmc');
});

test('Interpreted Fragment', () => {
	checkInterpretedOutput('jsx/fragment.pmc');
});

test('Transpiled Fragment', () => {
	checkTranspiledOutput('jsx/fragment.pmc');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('jsx/hyphenName.pmc');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('jsx/hyphenName.pmc');
});

test('Interpreted LiteralAttribute', () => {
	checkInterpretedOutput('jsx/literalAttribute.pmc');
});

test('Transpiled LiteralAttribute', () => {
	checkTranspiledOutput('jsx/literalAttribute.pmc');
});

test('Interpreted NonAsciiTextElement', () => {
	checkInterpretedOutput('jsx/nonAsciiTextElement.pmc');
});

test('Transpiled NonAsciiTextElement', () => {
	checkTranspiledOutput('jsx/nonAsciiTextElement.pmc');
});

test('Interpreted SelfClosingDiv', () => {
	checkInterpretedOutput('jsx/selfClosingDiv.pmc');
});

test('Transpiled SelfClosingDiv', () => {
	checkTranspiledOutput('jsx/selfClosingDiv.pmc');
});

test('Interpreted SelfClosingEmptyAttribute', () => {
	checkInterpretedOutput('jsx/selfClosingEmptyAttribute.pmc');
});

test('Transpiled SelfClosingEmptyAttribute', () => {
	checkTranspiledOutput('jsx/selfClosingEmptyAttribute.pmc');
});

test('Interpreted TextElement', () => {
	checkInterpretedOutput('jsx/textElement.pmc');
});

test('Transpiled TextElement', () => {
	checkTranspiledOutput('jsx/textElement.pmc');
});

