var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('CodeValue', () => {
	compareResourceEOE('css/codeValue.pec');
});

test('HyphenName', () => {
	compareResourceEOE('css/hyphenName.pec');
});

test('MultiValue', () => {
	compareResourceEOE('css/multiValue.pec');
});

test('NumberValue', () => {
	compareResourceEOE('css/numberValue.pec');
});

test('PixelValue', () => {
	compareResourceEOE('css/pixelValue.pec');
});

test('TextValue', () => {
	compareResourceEOE('css/textValue.pec');
});

