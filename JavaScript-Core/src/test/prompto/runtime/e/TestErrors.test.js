var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DivideByZero', () => {
	checkInterpretedOutput('errors/divideByZero.pec');
});

test('Transpiled DivideByZero', () => {
	checkTranspiledOutput('errors/divideByZero.pec');
});

test('Interpreted IndexOutOfRange_listItem', () => {
	checkInterpretedOutput('errors/indexOutOfRange-listItem.pec');
});

test('Transpiled IndexOutOfRange_listItem', () => {
	checkTranspiledOutput('errors/indexOutOfRange-listItem.pec');
});

test('Interpreted IndexOutOfRange_sliceList', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceList.pec');
});

test('Transpiled IndexOutOfRange_sliceList', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceList.pec');
});

test('Interpreted IndexOutOfRange_sliceRange', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceRange.pec');
});

test('Transpiled IndexOutOfRange_sliceRange', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceRange.pec');
});

test('Interpreted IndexOutOfRange_sliceText', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceText.pec');
});

test('Transpiled IndexOutOfRange_sliceText', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceText.pec');
});

test('Interpreted MemberInCatch', () => {
	checkInterpretedOutput('errors/memberInCatch.pec');
});

test('Transpiled MemberInCatch', () => {
	checkTranspiledOutput('errors/memberInCatch.pec');
});

test('Interpreted NullDict', () => {
	checkInterpretedOutput('errors/nullDict.pec');
});

test('Transpiled NullDict', () => {
	checkTranspiledOutput('errors/nullDict.pec');
});

test('Interpreted NullItem', () => {
	checkInterpretedOutput('errors/nullItem.pec');
});

test('Transpiled NullItem', () => {
	checkTranspiledOutput('errors/nullItem.pec');
});

test('Interpreted NullKey', () => {
	checkInterpretedOutput('errors/nullKey.pec');
});

test('Transpiled NullKey', () => {
	checkTranspiledOutput('errors/nullKey.pec');
});

test('Interpreted NullMember', () => {
	checkInterpretedOutput('errors/nullMember.pec');
});

test('Transpiled NullMember', () => {
	checkTranspiledOutput('errors/nullMember.pec');
});

test('Interpreted NullMethod', () => {
	checkInterpretedOutput('errors/nullMethod.pec');
});

test('Transpiled NullMethod', () => {
	checkTranspiledOutput('errors/nullMethod.pec');
});

test('Interpreted UserException', () => {
	checkInterpretedOutput('errors/userException.pec');
});

test('Transpiled UserException', () => {
	checkTranspiledOutput('errors/userException.pec');
});

