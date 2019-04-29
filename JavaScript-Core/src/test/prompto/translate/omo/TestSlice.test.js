var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('SliceList', () => {
	compareResourceOMO('slice/sliceList.poc');
});

test('SliceRange', () => {
	compareResourceOMO('slice/sliceRange.poc');
});

test('SliceText', () => {
	compareResourceOMO('slice/sliceText.poc');
});

