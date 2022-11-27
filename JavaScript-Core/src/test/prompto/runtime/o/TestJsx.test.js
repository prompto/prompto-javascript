var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ChildElement', () => {
	checkInterpretedOutput('jsx/childElement.poc');
});

test('Transpiled ChildElement', () => {
	checkTranspiledOutput('jsx/childElement.poc');
});

test('Interpreted CodeAttribute', () => {
	checkInterpretedOutput('jsx/codeAttribute.poc');
});

test('Transpiled CodeAttribute', () => {
	checkTranspiledOutput('jsx/codeAttribute.poc');
});

test('Interpreted CodeElement', () => {
	checkInterpretedOutput('jsx/codeElement.poc');
});

test('Transpiled CodeElement', () => {
	checkTranspiledOutput('jsx/codeElement.poc');
});

test('Interpreted DotName', () => {
	checkInterpretedOutput('jsx/dotName.poc');
});

test('Transpiled DotName', () => {
	checkTranspiledOutput('jsx/dotName.poc');
});

test('Interpreted EmptyAttribute', () => {
	checkInterpretedOutput('jsx/emptyAttribute.poc');
});

test('Transpiled EmptyAttribute', () => {
	checkTranspiledOutput('jsx/emptyAttribute.poc');
});

test('Interpreted Fragment', () => {
	checkInterpretedOutput('jsx/fragment.poc');
});

test('Transpiled Fragment', () => {
	checkTranspiledOutput('jsx/fragment.poc');
});

test('Interpreted HyphenName', () => {
	checkInterpretedOutput('jsx/hyphenName.poc');
});

test('Transpiled HyphenName', () => {
	checkTranspiledOutput('jsx/hyphenName.poc');
});

test('Interpreted LiteralAttribute', () => {
	checkInterpretedOutput('jsx/literalAttribute.poc');
});

test('Transpiled LiteralAttribute', () => {
	checkTranspiledOutput('jsx/literalAttribute.poc');
});

test('Interpreted MethodCall', () => {
	checkInterpretedOutput('jsx/methodCall.poc');
});

test('Transpiled MethodCall', () => {
	checkTranspiledOutput('jsx/methodCall.poc');
});

test('Interpreted MethodRef', () => {
	checkInterpretedOutput('jsx/methodRef.poc');
});

test('Transpiled MethodRef', () => {
	checkTranspiledOutput('jsx/methodRef.poc');
});

test('Interpreted NonAsciiTextElement', () => {
	checkInterpretedOutput('jsx/nonAsciiTextElement.poc');
});

test('Transpiled NonAsciiTextElement', () => {
	checkTranspiledOutput('jsx/nonAsciiTextElement.poc');
});

test('Interpreted SelfClosingDiv', () => {
	checkInterpretedOutput('jsx/selfClosingDiv.poc');
});

test('Transpiled SelfClosingDiv', () => {
	checkTranspiledOutput('jsx/selfClosingDiv.poc');
});

test('Interpreted SelfClosingEmptyAttribute', () => {
	checkInterpretedOutput('jsx/selfClosingEmptyAttribute.poc');
});

test('Transpiled SelfClosingEmptyAttribute', () => {
	checkTranspiledOutput('jsx/selfClosingEmptyAttribute.poc');
});

test('Interpreted TextElement', () => {
	checkInterpretedOutput('jsx/textElement.poc');
});

test('Transpiled TextElement', () => {
	checkTranspiledOutput('jsx/textElement.poc');
});

test('Interpreted ThisLowerMethodRef', () => {
	checkInterpretedOutput('jsx/thisLowerMethodRef.poc');
});

test('Transpiled ThisLowerMethodRef', () => {
	checkTranspiledOutput('jsx/thisLowerMethodRef.poc');
});

test('Interpreted ThisMethodCall', () => {
	checkInterpretedOutput('jsx/thisMethodCall.poc');
});

test('Transpiled ThisMethodCall', () => {
	checkTranspiledOutput('jsx/thisMethodCall.poc');
});

test('Interpreted ThisUpperMethodRef', () => {
	checkInterpretedOutput('jsx/thisUpperMethodRef.poc');
});

test('Transpiled ThisUpperMethodRef', () => {
	checkTranspiledOutput('jsx/thisUpperMethodRef.poc');
});

