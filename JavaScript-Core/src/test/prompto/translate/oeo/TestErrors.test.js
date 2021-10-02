var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('DivideByZero', () => {
	compareResourceOEO('errors/divideByZero.poc');
});

test('IndexOutOfRange_listItem', () => {
	compareResourceOEO('errors/indexOutOfRange-listItem.poc');
});

test('IndexOutOfRange_sliceList', () => {
	compareResourceOEO('errors/indexOutOfRange-sliceList.poc');
});

test('IndexOutOfRange_sliceRange', () => {
	compareResourceOEO('errors/indexOutOfRange-sliceRange.poc');
});

test('IndexOutOfRange_sliceText', () => {
	compareResourceOEO('errors/indexOutOfRange-sliceText.poc');
});

test('MemberInCatch', () => {
	compareResourceOEO('errors/memberInCatch.poc');
});

test('NullDict', () => {
	compareResourceOEO('errors/nullDict.poc');
});

test('NullItem', () => {
	compareResourceOEO('errors/nullItem.poc');
});

test('NullKey', () => {
	compareResourceOEO('errors/nullKey.poc');
});

test('NullMember', () => {
	compareResourceOEO('errors/nullMember.poc');
});

test('NullMethod', () => {
	compareResourceOEO('errors/nullMethod.poc');
});

test('UserException', () => {
	compareResourceOEO('errors/userException.poc');
});

