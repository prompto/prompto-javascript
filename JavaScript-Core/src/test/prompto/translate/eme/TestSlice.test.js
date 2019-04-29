var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('SliceList', () => {
	compareResourceEME('slice/sliceList.pec');
});

test('SliceRange', () => {
	compareResourceEME('slice/sliceRange.pec');
});

test('SliceText', () => {
	compareResourceEME('slice/sliceText.pec');
});

