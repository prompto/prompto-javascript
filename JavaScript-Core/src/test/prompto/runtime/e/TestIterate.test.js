var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ForEachCategoryList', () => {
	checkInterpretedOutput('iterate/forEachCategoryList.pec');
});

test('Transpiled ForEachCategoryList', () => {
	checkTranspiledOutput('iterate/forEachCategoryList.pec');
});

test('Interpreted ForEachExpression', () => {
	checkInterpretedOutput('iterate/forEachExpression.pec');
});

test('Transpiled ForEachExpression', () => {
	checkTranspiledOutput('iterate/forEachExpression.pec');
});

test('Interpreted ForEachIntegerList', () => {
	checkInterpretedOutput('iterate/forEachIntegerList.pec');
});

test('Transpiled ForEachIntegerList', () => {
	checkTranspiledOutput('iterate/forEachIntegerList.pec');
});

test('Interpreted ForEachIntegerSet', () => {
	checkInterpretedOutput('iterate/forEachIntegerSet.pec');
});

test('Transpiled ForEachIntegerSet', () => {
	checkTranspiledOutput('iterate/forEachIntegerSet.pec');
});

