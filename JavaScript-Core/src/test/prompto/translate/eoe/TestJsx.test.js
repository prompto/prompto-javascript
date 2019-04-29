var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ChildElement', () => {
	compareResourceEOE('jsx/childElement.pec');
});

test('CodeAttribute', () => {
	compareResourceEOE('jsx/codeAttribute.pec');
});

test('CodeElement', () => {
	compareResourceEOE('jsx/codeElement.pec');
});

test('DotName', () => {
	compareResourceEOE('jsx/dotName.pec');
});

test('Empty', () => {
	compareResourceEOE('jsx/empty.pec');
});

test('EmptyAttribute', () => {
	compareResourceEOE('jsx/emptyAttribute.pec');
});

test('HyphenName', () => {
	compareResourceEOE('jsx/hyphenName.pec');
});

test('LiteralAttribute', () => {
	compareResourceEOE('jsx/literalAttribute.pec');
});

test('SelfClosingDiv', () => {
	compareResourceEOE('jsx/selfClosingDiv.pec');
});

test('SelfClosingEmptyAttribute', () => {
	compareResourceEOE('jsx/selfClosingEmptyAttribute.pec');
});

test('TextElement', () => {
	compareResourceEOE('jsx/textElement.pec');
});

