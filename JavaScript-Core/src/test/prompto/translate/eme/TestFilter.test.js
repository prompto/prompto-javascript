var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('FilterFromCursor', () => {
	compareResourceEME('filter/filterFromCursor.pec');
});

test('FilterFromList', () => {
	compareResourceEME('filter/filterFromList.pec');
});

test('FilterFromSet', () => {
	compareResourceEME('filter/filterFromSet.pec');
});

