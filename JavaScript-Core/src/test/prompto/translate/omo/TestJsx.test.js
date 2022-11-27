var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ChildElement', () => {
	compareResourceOMO('jsx/childElement.poc');
});

test('CodeAttribute', () => {
	compareResourceOMO('jsx/codeAttribute.poc');
});

test('CodeElement', () => {
	compareResourceOMO('jsx/codeElement.poc');
});

test('DotName', () => {
	compareResourceOMO('jsx/dotName.poc');
});

test('Empty', () => {
	compareResourceOMO('jsx/empty.poc');
});

test('EmptyAttribute', () => {
	compareResourceOMO('jsx/emptyAttribute.poc');
});

test('Fragment', () => {
	compareResourceOMO('jsx/fragment.poc');
});

test('HyphenName', () => {
	compareResourceOMO('jsx/hyphenName.poc');
});

test('LiteralAttribute', () => {
	compareResourceOMO('jsx/literalAttribute.poc');
});

test('MethodCall', () => {
	compareResourceOMO('jsx/methodCall.poc');
});

test('MethodRef', () => {
	compareResourceOMO('jsx/methodRef.poc');
});

test('NonAsciiTextElement', () => {
	compareResourceOMO('jsx/nonAsciiTextElement.poc');
});

test('SelfClosingDiv', () => {
	compareResourceOMO('jsx/selfClosingDiv.poc');
});

test('SelfClosingEmptyAttribute', () => {
	compareResourceOMO('jsx/selfClosingEmptyAttribute.poc');
});

test('TextElement', () => {
	compareResourceOMO('jsx/textElement.poc');
});

test('ThisLowerMethodRef', () => {
	compareResourceOMO('jsx/thisLowerMethodRef.poc');
});

test('ThisMethodCall', () => {
	compareResourceOMO('jsx/thisMethodCall.poc');
});

test('ThisUpperMethodRef', () => {
	compareResourceOMO('jsx/thisUpperMethodRef.poc');
});

