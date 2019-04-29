var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseMParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseMParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ExpressionMember', () => {
	checkInterpretedOutput('methods/expressionMember.pmc');
});

test('Transpiled ExpressionMember', () => {
	checkTranspiledOutput('methods/expressionMember.pmc');
});

test('Interpreted TextAsync', () => {
	checkInterpretedOutput('methods/textAsync.pmc');
});

test('Transpiled TextAsync', () => {
	checkTranspiledOutput('methods/textAsync.pmc');
});

test('Interpreted VoidAsync', () => {
	checkInterpretedOutput('methods/voidAsync.pmc');
});

test('Transpiled VoidAsync', () => {
	checkTranspiledOutput('methods/voidAsync.pmc');
});

