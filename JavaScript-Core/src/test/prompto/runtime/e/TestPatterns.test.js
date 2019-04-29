var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted IntegerEnumeration', () => {
	checkInterpretedOutput('patterns/integerEnumeration.pec');
});

test('Transpiled IntegerEnumeration', () => {
	checkTranspiledOutput('patterns/integerEnumeration.pec');
});

test('Interpreted IntegerPattern', () => {
	checkInterpretedOutput('patterns/integerPattern.pec');
});

test('Transpiled IntegerPattern', () => {
	checkTranspiledOutput('patterns/integerPattern.pec');
});

test('Interpreted NegativeIntegerRange', () => {
	checkInterpretedOutput('patterns/negativeIntegerRange.pec');
});

test('Transpiled NegativeIntegerRange', () => {
	checkTranspiledOutput('patterns/negativeIntegerRange.pec');
});

test('Interpreted PositiveIntegerRange', () => {
	checkInterpretedOutput('patterns/positiveIntegerRange.pec');
});

test('Transpiled PositiveIntegerRange', () => {
	checkTranspiledOutput('patterns/positiveIntegerRange.pec');
});

test('Interpreted TextEnumeration', () => {
	checkInterpretedOutput('patterns/textEnumeration.pec');
});

test('Transpiled TextEnumeration', () => {
	checkTranspiledOutput('patterns/textEnumeration.pec');
});

test('Interpreted TextPattern', () => {
	checkInterpretedOutput('patterns/textPattern.pec');
});

test('Transpiled TextPattern', () => {
	checkTranspiledOutput('patterns/textPattern.pec');
});

