var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('CodeValue', () => {
	compareResourceOMO('css/codeValue.poc');
});

test('HyphenName', () => {
	compareResourceOMO('css/hyphenName.poc');
});

test('MultiValue', () => {
	compareResourceOMO('css/multiValue.poc');
});

test('NumberValue', () => {
	compareResourceOMO('css/numberValue.poc');
});

test('PixelValue', () => {
	compareResourceOMO('css/pixelValue.poc');
});

test('TextValue', () => {
	compareResourceOMO('css/textValue.poc');
});

