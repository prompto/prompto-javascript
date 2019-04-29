var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ChildElement', () => {
	compareResourceOEO('jsx/childElement.poc');
});

test('CodeAttribute', () => {
	compareResourceOEO('jsx/codeAttribute.poc');
});

test('CodeElement', () => {
	compareResourceOEO('jsx/codeElement.poc');
});

test('DotName', () => {
	compareResourceOEO('jsx/dotName.poc');
});

test('Empty', () => {
	compareResourceOEO('jsx/empty.poc');
});

test('EmptyAttribute', () => {
	compareResourceOEO('jsx/emptyAttribute.poc');
});

test('HyphenName', () => {
	compareResourceOEO('jsx/hyphenName.poc');
});

test('LiteralAttribute', () => {
	compareResourceOEO('jsx/literalAttribute.poc');
});

test('SelfClosingDiv', () => {
	compareResourceOEO('jsx/selfClosingDiv.poc');
});

test('SelfClosingEmptyAttribute', () => {
	compareResourceOEO('jsx/selfClosingEmptyAttribute.poc');
});

test('TextElement', () => {
	compareResourceOEO('jsx/textElement.poc');
});

