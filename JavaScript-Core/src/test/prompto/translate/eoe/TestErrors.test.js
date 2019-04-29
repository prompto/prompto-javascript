var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('DivideByZero', () => {
	compareResourceEOE('errors/divideByZero.pec');
});

test('IndexOutOfRange_listItem', () => {
	compareResourceEOE('errors/indexOutOfRange-listItem.pec');
});

test('IndexOutOfRange_sliceList', () => {
	compareResourceEOE('errors/indexOutOfRange-sliceList.pec');
});

test('IndexOutOfRange_sliceRange', () => {
	compareResourceEOE('errors/indexOutOfRange-sliceRange.pec');
});

test('IndexOutOfRange_sliceText', () => {
	compareResourceEOE('errors/indexOutOfRange-sliceText.pec');
});

test('NullDict', () => {
	compareResourceEOE('errors/nullDict.pec');
});

test('NullItem', () => {
	compareResourceEOE('errors/nullItem.pec');
});

test('NullKey', () => {
	compareResourceEOE('errors/nullKey.pec');
});

test('NullMember', () => {
	compareResourceEOE('errors/nullMember.pec');
});

test('NullMethod', () => {
	compareResourceEOE('errors/nullMethod.pec');
});

test('Unexpected', () => {
	compareResourceEOE('errors/unexpected.pec');
});

test('UserException', () => {
	compareResourceEOE('errors/userException.pec');
});

