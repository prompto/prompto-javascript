var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ForEachExpression', () => {
	checkInterpretedOutput('iterate/forEachExpression.pmc');
});

test('Transpiled ForEachExpression', () => {
	checkTranspiledOutput('iterate/forEachExpression.pmc');
});

