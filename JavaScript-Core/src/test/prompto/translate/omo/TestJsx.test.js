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

test('HyphenName', () => {
	compareResourceOMO('jsx/hyphenName.poc');
});

test('LiteralAttribute', () => {
	compareResourceOMO('jsx/literalAttribute.poc');
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

