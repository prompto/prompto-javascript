var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('HasAllFromList', () => {
	compareResourceEOE('arrow/hasAllFromList.pec');
});

test('HasAllFromSet', () => {
	compareResourceEOE('arrow/hasAllFromSet.pec');
});

test('HasAnyFromList', () => {
	compareResourceEOE('arrow/hasAnyFromList.pec');
});

test('HasAnyFromSet', () => {
	compareResourceEOE('arrow/hasAnyFromSet.pec');
});

