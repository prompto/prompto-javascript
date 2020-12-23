var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('HasAllFromList', () => {
	compareResourceEME('arrow/hasAllFromList.pec');
});

test('HasAllFromSet', () => {
	compareResourceEME('arrow/hasAllFromSet.pec');
});

test('HasAnyFromList', () => {
	compareResourceEME('arrow/hasAnyFromList.pec');
});

test('HasAnyFromSet', () => {
	compareResourceEME('arrow/hasAnyFromSet.pec');
});

