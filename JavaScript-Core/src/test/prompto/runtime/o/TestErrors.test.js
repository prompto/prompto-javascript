var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DivideByZero', () => {
	checkInterpretedOutput('errors/divideByZero.poc');
});

test('Transpiled DivideByZero', () => {
	checkTranspiledOutput('errors/divideByZero.poc');
});

test('Interpreted IndexOutOfRange_listItem', () => {
	checkInterpretedOutput('errors/indexOutOfRange-listItem.poc');
});

test('Transpiled IndexOutOfRange_listItem', () => {
	checkTranspiledOutput('errors/indexOutOfRange-listItem.poc');
});

test('Interpreted IndexOutOfRange_sliceList', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceList.poc');
});

test('Transpiled IndexOutOfRange_sliceList', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceList.poc');
});

test('Interpreted IndexOutOfRange_sliceRange', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceRange.poc');
});

test('Transpiled IndexOutOfRange_sliceRange', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceRange.poc');
});

test('Interpreted IndexOutOfRange_sliceText', () => {
	checkInterpretedOutput('errors/indexOutOfRange-sliceText.poc');
});

test('Transpiled IndexOutOfRange_sliceText', () => {
	checkTranspiledOutput('errors/indexOutOfRange-sliceText.poc');
});

test('Interpreted NullDict', () => {
	checkInterpretedOutput('errors/nullDict.poc');
});

test('Transpiled NullDict', () => {
	checkTranspiledOutput('errors/nullDict.poc');
});

test('Interpreted NullItem', () => {
	checkInterpretedOutput('errors/nullItem.poc');
});

test('Transpiled NullItem', () => {
	checkTranspiledOutput('errors/nullItem.poc');
});

test('Interpreted NullKey', () => {
	checkInterpretedOutput('errors/nullKey.poc');
});

test('Transpiled NullKey', () => {
	checkTranspiledOutput('errors/nullKey.poc');
});

test('Interpreted NullMember', () => {
	checkInterpretedOutput('errors/nullMember.poc');
});

test('Transpiled NullMember', () => {
	checkTranspiledOutput('errors/nullMember.poc');
});

test('Interpreted NullMethod', () => {
	checkInterpretedOutput('errors/nullMethod.poc');
});

test('Transpiled NullMethod', () => {
	checkTranspiledOutput('errors/nullMethod.poc');
});

test('Interpreted UserException', () => {
	checkInterpretedOutput('errors/userException.poc');
});

test('Transpiled UserException', () => {
	checkTranspiledOutput('errors/userException.poc');
});

