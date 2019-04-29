var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('SliceList', () => {
	compareResourceEOE('slice/sliceList.pec');
});

test('SliceRange', () => {
	compareResourceEOE('slice/sliceRange.pec');
});

test('SliceText', () => {
	compareResourceEOE('slice/sliceText.pec');
});

