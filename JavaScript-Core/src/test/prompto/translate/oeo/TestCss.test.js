var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('CodeValue', () => {
	compareResourceOEO('css/codeValue.poc');
});

test('HyphenName', () => {
	compareResourceOEO('css/hyphenName.poc');
});

test('MultiValue', () => {
	compareResourceOEO('css/multiValue.poc');
});

test('NumberValue', () => {
	compareResourceOEO('css/numberValue.poc');
});

test('PixelValue', () => {
	compareResourceOEO('css/pixelValue.poc');
});

test('TextValue', () => {
	compareResourceOEO('css/textValue.poc');
});

