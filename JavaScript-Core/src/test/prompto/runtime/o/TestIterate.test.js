var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ForEachExpression', () => {
	checkInterpretedOutput('iterate/forEachExpression.poc');
});

test('Transpiled ForEachExpression', () => {
	checkTranspiledOutput('iterate/forEachExpression.poc');
});

test('Interpreted ForEachIntegerList', () => {
	checkInterpretedOutput('iterate/forEachIntegerList.poc');
});

test('Transpiled ForEachIntegerList', () => {
	checkTranspiledOutput('iterate/forEachIntegerList.poc');
});

test('Interpreted ForEachIntegerRange', () => {
	checkInterpretedOutput('iterate/forEachIntegerRange.poc');
});

test('Transpiled ForEachIntegerRange', () => {
	checkTranspiledOutput('iterate/forEachIntegerRange.poc');
});

