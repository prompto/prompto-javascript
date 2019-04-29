var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('DivideByZero', () => {
	compareResourceEME('errors/divideByZero.pec');
});

test('IndexOutOfRange_listItem', () => {
	compareResourceEME('errors/indexOutOfRange-listItem.pec');
});

test('IndexOutOfRange_sliceList', () => {
	compareResourceEME('errors/indexOutOfRange-sliceList.pec');
});

test('IndexOutOfRange_sliceRange', () => {
	compareResourceEME('errors/indexOutOfRange-sliceRange.pec');
});

test('IndexOutOfRange_sliceText', () => {
	compareResourceEME('errors/indexOutOfRange-sliceText.pec');
});

test('NullDict', () => {
	compareResourceEME('errors/nullDict.pec');
});

test('NullItem', () => {
	compareResourceEME('errors/nullItem.pec');
});

test('NullKey', () => {
	compareResourceEME('errors/nullKey.pec');
});

test('NullMember', () => {
	compareResourceEME('errors/nullMember.pec');
});

test('NullMethod', () => {
	compareResourceEME('errors/nullMethod.pec');
});

test('Unexpected', () => {
	compareResourceEME('errors/unexpected.pec');
});

test('UserException', () => {
	compareResourceEME('errors/userException.pec');
});

