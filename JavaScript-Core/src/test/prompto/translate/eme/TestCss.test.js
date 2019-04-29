var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('CodeValue', () => {
	compareResourceEME('css/codeValue.pec');
});

test('HyphenName', () => {
	compareResourceEME('css/hyphenName.pec');
});

test('MultiValue', () => {
	compareResourceEME('css/multiValue.pec');
});

test('NumberValue', () => {
	compareResourceEME('css/numberValue.pec');
});

test('PixelValue', () => {
	compareResourceEME('css/pixelValue.pec');
});

test('TextValue', () => {
	compareResourceEME('css/textValue.pec');
});

