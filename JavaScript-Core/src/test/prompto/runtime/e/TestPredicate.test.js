var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted And', () => {
	checkInterpretedOutput('predicate/and.pec');
});

test('Transpiled And', () => {
	checkTranspiledOutput('predicate/and.pec');
});

test('Interpreted AndError', () => {
	checkInterpretedOutput('predicate/andError.pec');
});

test('Transpiled AndError', () => {
	checkTranspiledOutput('predicate/andError.pec');
});

test('Interpreted ContainsItem', () => {
	checkInterpretedOutput('predicate/containsItem.pec');
});

test('Transpiled ContainsItem', () => {
	checkTranspiledOutput('predicate/containsItem.pec');
});

test('Interpreted Equals', () => {
	checkInterpretedOutput('predicate/equals.pec');
});

test('Transpiled Equals', () => {
	checkTranspiledOutput('predicate/equals.pec');
});

test('Interpreted EqualsError', () => {
	checkInterpretedOutput('predicate/equalsError.pec');
});

test('Transpiled EqualsError', () => {
	checkTranspiledOutput('predicate/equalsError.pec');
});

test('Interpreted Greater', () => {
	checkInterpretedOutput('predicate/greater.pec');
});

test('Transpiled Greater', () => {
	checkTranspiledOutput('predicate/greater.pec');
});

test('Interpreted HasItem', () => {
	checkInterpretedOutput('predicate/hasItem.pec');
});

test('Transpiled HasItem', () => {
	checkTranspiledOutput('predicate/hasItem.pec');
});

test('Interpreted InList', () => {
	checkInterpretedOutput('predicate/inList.pec');
});

test('Transpiled InList', () => {
	checkTranspiledOutput('predicate/inList.pec');
});

test('Interpreted Lesser', () => {
	checkInterpretedOutput('predicate/lesser.pec');
});

test('Transpiled Lesser', () => {
	checkTranspiledOutput('predicate/lesser.pec');
});

test('Interpreted NotEquals', () => {
	checkInterpretedOutput('predicate/notEquals.pec');
});

test('Transpiled NotEquals', () => {
	checkTranspiledOutput('predicate/notEquals.pec');
});

test('Interpreted Or', () => {
	checkInterpretedOutput('predicate/or.pec');
});

test('Transpiled Or', () => {
	checkTranspiledOutput('predicate/or.pec');
});

test('Interpreted OrError', () => {
	checkInterpretedOutput('predicate/orError.pec');
});

test('Transpiled OrError', () => {
	checkTranspiledOutput('predicate/orError.pec');
});

test('Interpreted Parenthesis', () => {
	checkInterpretedOutput('predicate/parenthesis.pec');
});

test('Transpiled Parenthesis', () => {
	checkTranspiledOutput('predicate/parenthesis.pec');
});

test('Interpreted ParenthesisError', () => {
	checkInterpretedOutput('predicate/parenthesisError.pec');
});

test('Transpiled ParenthesisError', () => {
	checkTranspiledOutput('predicate/parenthesisError.pec');
});

test('Interpreted Partial', () => {
	checkInterpretedOutput('predicate/partial.pec');
});

test('Transpiled Partial', () => {
	checkTranspiledOutput('predicate/partial.pec');
});

test('Interpreted Roughly', () => {
	checkInterpretedOutput('predicate/roughly.pec');
});

test('Transpiled Roughly', () => {
	checkTranspiledOutput('predicate/roughly.pec');
});

