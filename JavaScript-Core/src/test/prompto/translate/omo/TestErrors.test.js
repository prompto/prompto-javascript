var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('DivideByZero', () => {
	compareResourceOMO('errors/divideByZero.poc');
});

test('IndexOutOfRange_listItem', () => {
	compareResourceOMO('errors/indexOutOfRange-listItem.poc');
});

test('IndexOutOfRange_sliceList', () => {
	compareResourceOMO('errors/indexOutOfRange-sliceList.poc');
});

test('IndexOutOfRange_sliceRange', () => {
	compareResourceOMO('errors/indexOutOfRange-sliceRange.poc');
});

test('IndexOutOfRange_sliceText', () => {
	compareResourceOMO('errors/indexOutOfRange-sliceText.poc');
});

test('NullDict', () => {
	compareResourceOMO('errors/nullDict.poc');
});

test('NullItem', () => {
	compareResourceOMO('errors/nullItem.poc');
});

test('NullKey', () => {
	compareResourceOMO('errors/nullKey.poc');
});

test('NullMember', () => {
	compareResourceOMO('errors/nullMember.poc');
});

test('NullMethod', () => {
	compareResourceOMO('errors/nullMethod.poc');
});

test('UserException', () => {
	compareResourceOMO('errors/userException.poc');
});

