var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('SliceList', () => {
	compareResourceOEO('slice/sliceList.poc');
});

test('SliceRange', () => {
	compareResourceOEO('slice/sliceRange.poc');
});

test('SliceText', () => {
	compareResourceOEO('slice/sliceText.poc');
});

