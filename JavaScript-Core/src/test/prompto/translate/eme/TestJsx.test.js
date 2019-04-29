var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('ChildElement', () => {
	compareResourceEME('jsx/childElement.pec');
});

test('CodeAttribute', () => {
	compareResourceEME('jsx/codeAttribute.pec');
});

test('CodeElement', () => {
	compareResourceEME('jsx/codeElement.pec');
});

test('DotName', () => {
	compareResourceEME('jsx/dotName.pec');
});

test('Empty', () => {
	compareResourceEME('jsx/empty.pec');
});

test('EmptyAttribute', () => {
	compareResourceEME('jsx/emptyAttribute.pec');
});

test('HyphenName', () => {
	compareResourceEME('jsx/hyphenName.pec');
});

test('LiteralAttribute', () => {
	compareResourceEME('jsx/literalAttribute.pec');
});

test('SelfClosingDiv', () => {
	compareResourceEME('jsx/selfClosingDiv.pec');
});

test('SelfClosingEmptyAttribute', () => {
	compareResourceEME('jsx/selfClosingEmptyAttribute.pec');
});

test('TextElement', () => {
	compareResourceEME('jsx/textElement.pec');
});

