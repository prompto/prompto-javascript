var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('FilterFromCursor', () => {
	compareResourceEOE('filter/filterFromCursor.pec');
});

test('FilterFromList', () => {
	compareResourceEOE('filter/filterFromList.pec');
});

test('FilterFromSet', () => {
	compareResourceEOE('filter/filterFromSet.pec');
});

